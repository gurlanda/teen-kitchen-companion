// Takes in a function that maps InTypes to OutTypes and creates a wrapper function which maps (InType | undefined) to (OutType | undefined).
export const maybeToMaybe 
  = <InType, OutType>(func: {(input: InType): OutType}): {(input: InType | undefined): OutType | undefined} => {
    return (input: InType | undefined) => {
      if (input === undefined) { return undefined; }
      return func(input);
    }
  }