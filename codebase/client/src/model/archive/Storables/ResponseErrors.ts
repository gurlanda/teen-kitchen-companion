type ResponseErrors = { errors: string[] };
export default ResponseErrors;

export const isResponseErrors = (object: any): object is ResponseErrors => {
  return 'errors' in object;
};
