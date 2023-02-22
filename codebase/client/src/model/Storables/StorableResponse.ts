import StorableOption from './StorableOption';

type StorableResponse = {
  questionId: string;
  dateResponse?: number;
  numResponse?: number;
  openResponse?: string;
  selcOptions?: StorableOption[];
  selcImgOption?: number;
  rowResponses?: StorableResponse[];
};
export default StorableResponse;
