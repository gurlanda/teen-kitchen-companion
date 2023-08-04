import Clonable from '../../Interfaces/Clonable';
import Option from './Option';
import * as DateUtil from '../../../utils/DateUtil';
import StorableResponse from '../Storables/StorableResponse';

export default class Response implements Clonable<Response> {
  questionId: string;

  // These properties represent the kinds of responses that come from different kinds of questions
  // Temporal questions (Date, DateTime, Time)
  dateResponse?: Date;

  // Numerical questions (LinearScale, Number)
  numResponse?: number;

  // Open answer questions (ShortAnswer, LongAnswer)
  openResponse?: string;

  // Choice questions (MultChoice, Checkbox)
  selcOptions?: Option[];

  // ImgLinearScale
  selcImgOption?: number;

  // Grid questions (MultChoiceGrid, CheckboxGrid)
  rowResponses?: Response[];

  constructor(questionId: string) {
    this.questionId = questionId;
  }

  clone(): Response {
    const output = new Response(this.questionId);

    output.numResponse = this?.numResponse;
    output.openResponse = this?.openResponse;
    output.dateResponse = DateUtil.cloneMaybeDate(this.dateResponse);
    output.selcOptions = this?.selcOptions?.map((opt) => opt.clone());
    output.selcImgOption = this?.selcImgOption;
    output.rowResponses = this?.rowResponses?.map((resp) => resp.clone());

    return output;
  }

  toStorable(): StorableResponse {
    const { clone, toStorable, questionId, ...optionalProps } = this;
    let output = { questionId };

    // Populate the output
    let prop: keyof typeof optionalProps;
    for (prop in optionalProps) {
      let currentProp = optionalProps[prop];

      // Add only the defined properties to output
      if (currentProp) {
        if (currentProp instanceof Date) {
          output = { ...output, [prop]: currentProp.getTime() };
        } else if (currentProp instanceof Array) {
          output = {
            ...output,
            [prop]: currentProp.map((val) => val.toStorable()),
          };
        } else {
          output = { ...output, [prop]: currentProp };
        }
      }
    }

    return output;
  }

  static fromStorable(data: StorableResponse): Response {
    let output = new Response(data.questionId);

    output.dateResponse = DateUtil.numberToDateMaybe(data.dateResponse);
    output.numResponse = data?.numResponse;
    output.openResponse = data?.openResponse;
    output.selcOptions = data?.selcOptions?.map((opt) =>
      Option.fromStorable(opt)
    );
    output.selcImgOption = data?.selcImgOption;
    output.rowResponses = data?.rowResponses?.map((row) =>
      Response.fromStorable(row)
    );

    return output;
  }
}
