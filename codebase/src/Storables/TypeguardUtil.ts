type TypePredicate = { (arg: any): boolean };

export const isString = (arg: any) => {
  return typeof arg === 'string';
};

export const isArray = (arg: any) => {
  return arg instanceof Array;
};

export const isBoolean = (arg: any) => {
  return typeof arg === 'boolean';
};

export const isNumber = (arg: any) => {
  return typeof arg === 'number';
};

const isUndefined = (arg: any) => {
  return typeof arg === 'undefined';
};

export const maybeTPFactory = (typePredicate: TypePredicate): TypePredicate => {
  return (arg: any) => typePredicate(arg) || isUndefined(arg);
};

export const arrayTPFactory = (
  elemTypePredicate: TypePredicate
): TypePredicate => {
  return (arg: any) => {
    if (!isArray(arg)) {
      return false;
    }

    if (arg.length === 0) {
      return true;
    } else {
      return elemTypePredicate(arg[0]);
    }
  };
};

export const isMaybeString = maybeTPFactory(isString);

export const isMaybeBoolean = maybeTPFactory(isBoolean);

export const isMaybeNumber = maybeTPFactory(isNumber);
