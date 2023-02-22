import { Router, NextFunction } from 'express';
import Entries from '../services/EntryService';
import Journals from '../services/JournalService';
import StorableEntry, {
  isStorableEntry,
  isStorableEntryArray,
} from '../Storables/StorableEntry';
import StorableJournal, {
  isStorableJournal,
} from '../Storables/StorableJournal';
import StorableJournalTemplate, {
  isStorableJournalTemplate,
} from '../Storables/StorableJournalTemplate';
import { TypedRequest, TypedResponse } from '../utils/TypedExpress';
import createLogger from '../utils/createLogger';
import { resBodyAbstractFactory } from '../Storables/ResponseData';
import Auth from '../middleware/auth';
import { ifError } from 'assert';

const journalRoutes = Router();

/**
 * @route   GET /api/v1/journals[?journalid]
 * @desc    Get a single journal or a collection of journals
 * @access  Private
 * @param   {string} [journalid] The ID of the journal to retrieve
 * @return  {ResponseData<StorableJournal | StorableJournal[]>}
 */
journalRoutes.get(
  '/',
  Auth.authenticator,
  async (
    req: TypedRequest<{ journalid: string }>,
    res: TypedResponse<StorableJournal | StorableJournal[]>,
    next: NextFunction
  ) => {
    type Payload = StorableJournal | StorableJournal[];
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'GET /journals (Retrieve possibly multiple journals)'
    );

    try {
      // If there's a query string, then this request should be for a single journal
      const numQueryParams = Object.keys(req.query).length;
      if (numQueryParams !== 0) {
        const journalId = req.query.journalid;
        if (journalId) {
          log(`journalid === ${journalId}`);
          log('Looking for journal...');
          const journal = await Journals.findById(journalId);
          if (!journal) {
            end('Journal not found.');
            return res.status(404).json(resBody(false));
          }

          end('Journal found, serving the journal to user.');
          return res.status(200).json(resBody(true, journal.toStorable()));
        } else {
          end('Invalid query');
          return res.status(400).json(resBody(false, null, 'Invalid query'));
        }
      }

      // If there's no query string, then this request should be for a collection of Journals
      log('Retrieving journals...');
      const journals = await Journals.retrieveJournals();

      console.log(journals);
      end('Journals retrieved. Serving to user.');
      return res.status(200).json(
        resBody(
          true,
          journals.map((elem) => elem.toStorable())
        )
      );
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   GET /api/v1/journals/entries?[journalid|entryid]
 * @desc    Get a logged-in user's entry/entries, possibly for a particular journal
 * @access  Private
 * @param   {string} [journalid]
 * @param   {string} [entryid]
 * @returns {ResponseData<StorableEntry | StorableEntry[]>}
 */
journalRoutes.get(
  '/entries',
  Auth.authenticator,
  async (
    req: TypedRequest<{ journalid?: string; entryid?: string }>,
    res: TypedResponse<StorableEntry | StorableEntry[]>
  ) => {
    type Payload = StorableEntry | StorableEntry[];
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      "GET /journals/entries (Retrieve user's entry or entries)"
    );

    try {
      // Get all the user's entries for the journal
      const userEmail = res.locals.user?.email;
      if (!userEmail) {
        end('Possibly server error: No user found after successful auth');
        return res
          .status(401)
          .json(resBody(false, null, 'Invalid credentials'));
      }

      // There should only be one parameter
      const numQueryParams = Object.keys(req.query).length;
      if (numQueryParams === 1) {
        const journalId = req.query.journalid;
        const entryId = req.query.entryid;
        if (journalId) {
          // Get all the user's entries for this journal
          log(`journalid === ${journalId}`);
          const journal = await Journals.exists({ _id: journalId });
          if (!journal) {
            end('Journal not found.');
            return res.status(404).json(resBody(false));
          }

          log('Looking for entries');
          const entries = await Entries.find({ journalId, userEmail });
          end('Entries found, serving to user');
          return res.status(200).json(
            resBody(
              true,
              entries.map((elem) => elem.toStorable())
            )
          );
        } else if (entryId) {
          // Get single entry
          log(`entryid === ${entryId}`);
          log('Looking for entry');
          const entry = await Entries.findById(entryId);
          if (!entry) {
            log('Entry not found.');
            return res
              .status(404)
              .json(resBody(false, null, 'Entry not found'));
          }

          // Check if the logged-in user owns the found entry
          const userEmail = res.locals.user?.email;
          if (!(entry.userEmail === userEmail)) {
            end('The logged-in user is not the owner of the entry.');
            return res
              .status(403)
              .json(
                resBody(
                  false,
                  null,
                  'The logged-in user must also be the owner of this entry'
                )
              );
          }

          end('Entry found; now serving');
          return res.status(200).json(resBody(true, entry.toStorable()));
        } else {
          // Error: Invalid query param
          end('Invalid query');
          return res
            .status(400)
            .json(resBody(false, null, 'Invalid query parameters'));
        }
      } else if (numQueryParams === 0) {
        // Get all the user's journal entries
        log("Retrieving all user's entries");
        const entries = await Entries.find({ userEmail });
        end('Success, now serving.');
        return res.status(200).json(
          resBody(
            true,
            entries.map((elem) => elem.toStorable())
          )
        );
      } else {
        // Retrieve all the user's entries
        end('Invalid query.');
        return res
          .status(400)
          .json(resBody(false, null, 'Invalid query parameters'));
      }
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   PUT /api/v1/journals/entries
 * @desc    Update an existing entry
 * @access  Private
 * @param   {StorableEntry} body
 * @return  {ResponseData<StorableEntry>}
 */
journalRoutes.put(
  '/entries',
  Auth.authenticator,
  async (
    req: TypedRequest<{}, StorableEntry>,
    res: TypedResponse<StorableEntry>
  ) => {
    type Payload = StorableEntry;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'PUT /journals/entries (Update existing entry)'
    );

    try {
      const submittedEntry: StorableEntry = req.body;
      if (!isStorableEntry(submittedEntry)) {
        end('Ill-formed body.');
        return res.status(400).json(resBody(false, null, 'Ill-formed body'));
      }

      // Make sure that the userEmail in the Entry matches the userEmail of the logged-in user

      const updatedEntry = await Entries.findAndUpdate(
        submittedEntry._id,
        submittedEntry
      );
      if (!updatedEntry) {
        end('Entry not found');
        return res.status(404).json(resBody(false, null, 'Entry not found'));
      }

      log('Success, serving updated entry.');
      return res.status(200).json(resBody(true, updatedEntry.toStorable()));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   POST /api/v1/journals/entries
 * @desc    Create a new entry or multiple new entries
 * @access  Private
 * @param   {StorableEntry[]} body
 * @return  {ResponseData<StorableEntry[]>}
 */
journalRoutes.post(
  '/entries',
  Auth.authenticator,
  async (
    req: TypedRequest<{}, StorableEntry[]>,
    res: TypedResponse<StorableEntry[]>
  ) => {
    type Payload = StorableEntry[];
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'POST /journals/entries (Create one or more new entries)'
    );

    try {
      if (!isStorableEntryArray(req.body)) {
        end('Ill-formed body.');
        return res.status(400).json(resBody(false, null, 'Ill-formed body'));
      }

      end('Not implemented.');
      return res.status(500).json(resBody(false));

      // const submittedEntries: StorableEntry[] = req.body;
      // res.status(500).json(resBody(false, null, 'Not implemented'));
      // TODO: Make sure that the userEmail in the Entry matches the userEmail of the logged-in user
      // Make sure that the journal exists
      // const journalExists = await Journals.exists({
      //   _id: submittedEntries.journalId,
      // });
      // if (!journalExists) {
      //   return res
      //     .status(400)
      //     .json(
      //       resBody(
      //         false,
      //         null,
      //         'Targeted journal for the submitted entry does not exist'
      //       )
      //     );
      // }
      // const createdEntry = await Entries.create(submittedEntries);
      // if (!createdEntry) {
      //   return res
      //     .status(400)
      //     .json(resBody(false, null, 'Submitted entry is malformed'));
      // }
      // return res.status(200).json(resBody(true, [createdEntry.toStorable()]));
      // const numQueryParams = Object.keys(req.query).length;
      // if (numQueryParams !== 0) {
      //   const journalId = req.query.journalid;
      //   if (journalId) {
      //     // Check if the journal exists
      //     console.log('POST /journals/entries?journalid: Looking for journal...');
      //     const journal = await Journal.findById(journalId);
      //     if (!journal) {
      //       return next(
      //         new ErrorResponse(`Journal not found with ID ${journalId}`, 404)
      //       );
      //     }
      //     console.log(
      //       'POST /journals/entries?journalid: Journal found, attempting to create new journal entry...'
      //     );
      //     newEntry = await JournalEntry.create(req.body);
      //     if (!newEntry) {
      //       return next(new ErrorResponse(`Entry could not be updated.`, 500));
      //     }
      //     return res.status(201).json({
      //       success: true,
      //       data: newEntry,
      //     });
      //   } else {
      //     return next(new ErrorResponse('Invalid query string', 400));
      //   }
      // } else {
      //   return next(new ErrorResponse('Invalid query string', 400));
      // }
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   POST /api/v1/journals
 * @desc    Create a new journal
 * @param   {StorableJournal} body
 * @return  {ResponseData<StorableJournal>}
 * @access  Admin
 */
journalRoutes.post(
  '/',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (
    req: TypedRequest<{}, StorableJournal>,
    res: TypedResponse<StorableJournal>,
    next: NextFunction
  ) => {
    type Payload = StorableJournal;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger('POST /journals (Create a new journal)');

    try {
      if (!isStorableJournal(req.body)) {
        end('Ill-formed body.');
        return res.status(400).json(resBody(false, null, 'Ill-formed body'));
      }

      end('Not implemented.');
      return res.status(500).json(resBody(false, null, 'Not implemented'));
      // // Check that the request is well-formed
      // console.log('POST /journals: Validating given dates...');
      // // const weekStartDate = req.body?.weekStartDate;
      // // const weekEndDate = req.body?.weekEndDate;
      // if (!weekStartDate || !weekEndDate) {
      //   return next(
      //     new ErrorResponse('weekStartDate and weekEndDate must be given.', 400)
      //   );
      // }
      // const valiDate = (date) => {
      //   if (!date.year || !date.monthIndex || !date.date) {
      //     return false;
      //   }
      //   return true;
      // };
      // if (!valiDate(weekStartDate) || !valiDate(weekEndDate)) {
      //   return next(
      //     new ErrorResponse(
      //       'One of the given dates is missing a required field.',
      //       400
      //     )
      //   );
      // }
      // // Make sure the start date is before the end date
      // if (!(weekStartDate.year <= weekEndDate.year)) {
      //   return next(
      //     new ErrorResponse('weekStartDate is not before weekEndDate', 400)
      //   );
      // } else if (!(weekStartDate.monthIndex <= weekEndDate.monthIndex)) {
      //   return next(
      //     new ErrorResponse('weekStartDate is not before weekEndDate', 400)
      //   );
      // }
      // // else if (!(weekStartDate.date <= weekEndDate.date)) {
      // //   return next(
      // //     new ErrorResponse('weekStartDate is not before weekEndDate', 400)
      // //   );
      // // }
      // console.log(
      //   'POST /journals: Dates validated. Attempting to create new Journal...'
      // );
      // const template = await JournalTemplate.findOne();
      // const newJournal = await Journal.create({
      //   weekStartDate,
      //   weekEndDate,
      //   questions: template.questions,
      // });
      // if (!newJournal) {
      //   return next(new ErrorResponse('Ill-formed journal', 400));
      // }
      // console.log('POST /journals: Creation successful. Serving new Journal.');
      // return res.status(201).json({
      //   success: true,
      //   data: newJournal,
      // });
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   PUT /api/v1/journals/template
 * @desc    Update the journal template
 * @param   {StorableJournalTemplate} body
 * @return  {ResponseData<StorableJournalTemplate>}
 * @access  Admin
 */
journalRoutes.put(
  '/template',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (
    req: TypedRequest<{}, StorableJournalTemplate>,
    res: TypedResponse<StorableJournalTemplate>
  ) => {
    type Payload = StorableJournalTemplate;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end, err] = createLogger(
      'PUT /journals/template (Update the journal template)'
    );

    try {
      if (!isStorableJournalTemplate(req.body)) {
        err('Ill-formed body.');
        return res.status(400).json(resBody(false, null, 'Ill-formed body'));
      }

      const updatedTemplate = await Journals.updateTemplate(req.body);
      if (!updatedTemplate) {
        err('Ill-formed template.');
        return res
          .status(400)
          .json(resBody(false, null, 'Ill-formed template.'));
      }

      end('Update successful, serving updated template.');
      return res.status(200).json(resBody(true, updatedTemplate.toStorable()));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        err(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      err(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   GET /api/v1/journals/template
 * @desc    Retrieve the journal template
 * @return  {ResponseData<StorableJournalTemplate>}
 * @access  Admin
 */
journalRoutes.get(
  '/template',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (req: TypedRequest, res: TypedResponse<StorableJournalTemplate>) => {
    type Payload = StorableJournalTemplate;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end, err] = createLogger(
      'GET /journals/template (Retrieve the journal template)'
    );

    try {
      const template = await Journals.retrieveTemplate();
      if (!template) {
        err(
          'Possibly server error: Journals.retrieveTemplate() should never return null.'
        );
        return res.status(404).json(resBody(false));
      }

      end('Serving journal template to admin user.');
      return res.status(201).json(resBody(true, template!.toStorable()));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

/**
 * @route   DELETE /api/v1/journals?journalid
 * @desc    Delete a journal
 * @param   {string} journalid
 * @access  Admin
 * @return  {ResponseData<null>}
 */
journalRoutes.delete(
  '/',
  Auth.authenticator,
  Auth.adminAuthorizer,
  async (
    req: TypedRequest<{ journalid: string }>,
    res: TypedResponse<null>
  ) => {
    type Payload = null;
    const resBody = resBodyAbstractFactory<Payload>();
    const [log, end] = createLogger(
      'DELETE /journals?journalid (Delete a journal)'
    );

    try {
      if (!req.query.journalid) {
        end('Invalid query.');
        return res.status(400).json(resBody(false));
      }

      log(`journalid === ${req.query.journalid}`);
      log('Looking for journal...');
      const journalId = req.query.journalid;
      const journalExists = await Journals.exists({ _id: journalId });
      if (!journalExists) {
        end('Journal does not exist');
        return res
          .status(404)
          .json(resBody(false, null, 'Journal does not exist'));
      }

      log('Journal found.');
      await Journals.deleteJournal(journalId);

      console.log('DELETE /journals?journalid: Deletion successful.');
      return res.status(204).json(resBody(true));
    } catch (e: any) {
      if (e?.kind === 'ObjectId') {
        log('Cast error.');
        end(e);
        return res.status(404).json(resBody(false));
      }

      log('Uncaught error.');
      end(e);
      return res.status(500).json(resBody(false));
    }
  }
);

export default journalRoutes;
