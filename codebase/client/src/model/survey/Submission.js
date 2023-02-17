import User from '../user/User';
export default class Submission {
  // submittedOnUtc must be UTC timestamps
  // responses must be an array of Response objects
  // user must be a User object
  constructor(surveyId, user, submittedOnUtc, responses, surveyVersion) {
    if (!(responses instanceof Array)) {
      throw new TypeError(
        "In constructor Submission(): The argument passed to the parameter 'responses' is not an Array."
      );
    }

    for (const response of responses) {
      if (!(response instanceof Response)) {
        throw new TypeError(
          "In constructor Submission(): At least one element in 'responses' is not a Response."
        );
      }
    }

    if (!(user instanceof User)) {
      throw new TypeError(
        "In constructor Submission(): The argument passed to the parameter 'user' is not a User."
      );
    }

    this.surveyId = surveyId;
    this.user = user.clone();
    this.surveyVersion = surveyVersion;
    this.responses = responses.map((response) => response.clone());

    this.submittedOn = submittedOnUtc ? new Date(submittedOnUtc) : null;
  }

  clone() {
    return new Submission(
      this.surveyId,
      this.userId,
      this.submittedOn?.getTime(),
      this.responses,
      this.surveyVersion
    );
  }

  toStorable() {
    let storableResponses = this.responses.map((response) =>
      response.toStorable()
    );

    return {
      submittedOn: this.submittedOn?.getTime() ?? null,
      surveyId: this.surveyId,
      surveyVersion: this.surveyVersion,
      user: this.user.toStorable(),
      responses: storableResponses,
    };
  }
}
