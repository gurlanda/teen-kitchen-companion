const logEnabled = true;
const objectsEnabled = true;

const createLogger = (location: string, isLocallyEnabled = true) => {
  if (logEnabled && isLocallyEnabled) {
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
      log(`Transaction closed.\n`);
    };

    const err = (message: any) => {
      if (typeof message === 'string') {
        console.error(`In ${location}: ${message}`);
      } else if (message === null || message === undefined) {
        // Do nothing if nullish
      } else if (objectsEnabled) {
        console.error(`In ${location}:`);
        console.error(message);
      }

      end();
      return;
    };

    return [log, end, err];
  }

  const noOp = () => {};
  return [noOp, noOp, noOp];
};

export default createLogger;
