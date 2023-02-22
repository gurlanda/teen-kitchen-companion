export default interface Clonable<ThisType> {
  clone(): ThisType;
}

/**
 * A utility class indicating that
 */
// class Clone<ThisType> {
//   payload: ThisType;

//   constructor(payload: ThisType) {
//     this.payload = payload;
//   }
// }
