class ResponseData<Payload> {
  success: boolean;
  errors: string[];
  payload: Payload | null;

  constructor(
    success: boolean,
    payload: Payload | null = null,
    errors: string[] | string = []
  ) {
    if (errors instanceof Array) {
      this.errors = errors;
    } else {
      this.errors = [errors];
    }

    this.success = success;
    this.payload = payload;
  }
}

export const resBodyAbstractFactory = <Payload>() => {
  return (
    success: boolean,
    payload: Payload | null = null,
    errors: string[] | string = []
  ) => {
    return new ResponseData<Payload>(success, payload, errors);
  };
};

export default ResponseData;
