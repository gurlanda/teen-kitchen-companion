const logEnabled = true;
const objectsEnabled = true;

const createLogger = (location: string) => {
  if (logEnabled) {
    const log = (message: any) => {
      if (typeof message === 'string') {
        console.log(`In ${location}: ${message}`);
      } else if (message === null || message === undefined) {
        // Do nothing if nullish
        return;
      } else if (objectsEnabled) {
        console.log(`In ${location}:`);
        console.log(message);
      }
    };

    const end = (message?: any) => {
      // const prefix = message ? `${message} ` : '';

      log(message);
      log(`Request closed.\n`);
    };

    return [log, end];
  }

  const noOp = () => {};
  return [noOp, noOp];
};

export default createLogger;
