import Clonable from '../../Interfaces/Clonable';
import Identifiable from '../../Interfaces/Identifiable';
import * as DateUtil from '../../../utils/DateUtil';
import createId from '../../../utils/createId';
import Response from '../Question/Response';
import StorableSubmission from '../Storables/StorableSubmission';

export default class Submission implements Clonable<Submission>, Identifiable {
  id: string;
  surveyId: string;
  surveyVersion: number;
  userEmail: string;
  submittedOn: Date;
  responses: Response[];

  constructor(
    surveyId: string,
    surveyVersion: number,
    userEmail: string,
    responses: Response[],
    submittedOn: Date | number = new Date(),
    id?: string
  ) {
    this.surveyId = surveyId;
    this.userEmail = userEmail;
    this.surveyVersion = surveyVersion;
    this.submittedOn = DateUtil.toDate(submittedOn);
    this.responses = responses.map((res) => res.clone());

    if (!id) {
      this.id = createId();
    } else {
      this.id = id;
    }
  }

  clone() {
    return new Submission(
      this.surveyId,
      this.surveyVersion,
      this.userEmail,
      this.responses,
      this.submittedOn,
      this.id
    );
  }

  toStorable(): StorableSubmission {
    return {
      _id: this.id,
      surveyId: this.surveyId,
      surveyVersion: this.surveyVersion,
      userEmail: this.userEmail,
      submittedOn: this.submittedOn.getTime(),
      responses: this.responses.map((res) => res.toStorable()),
    };
  }

  static fromStorable(data: StorableSubmission): Submission {
    return new Submission(
      data.surveyId,
      data.surveyVersion,
      data.userEmail,
      data.responses.map((res) => Response.fromStorable(res)),
      data.submittedOn,
      data._id
    );
  }
}
