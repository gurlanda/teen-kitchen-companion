import { Types } from 'mongoose';
import Survey from '../models/Survey';
import StorableSurvey from '../Storables/StorableSurvey';
import UserTypes from '../models/UserType';

const runValidators = { runValidators: true };
namespace Surveys {
  export const exists = async (surveyId: string | Types.ObjectId) => {
    const found = await Survey.exists({ _id: surveyId });
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  export const findById = async (surveyId: Types.ObjectId | string) => {
    return await Survey.findById(surveyId);
  };

  export const findByIdAndUpdate = async (
    surveyId: Types.ObjectId | string,
    updated: StorableSurvey
  ) => {
    return await Survey.findByIdAndUpdate(surveyId, updated, runValidators);
  };

  export const retrieveAllSurveys = async () => {
    return await Survey.find();
  };

  export const retrieveSurveysWithAudience = async (
    userType: UserTypes.asUnion
  ) => {
    return await Survey.find({ audience: userType });
  };

  export const deleteSurvey = async (surveyId: Types.ObjectId | string) => {
    return await Survey.deleteOne({ _id: surveyId });
  };

  export const create = async (newSurvey: StorableSurvey) => {
    return await Survey.create(newSurvey);
  };
}

export default Surveys;
