import { doc } from 'firebase/firestore';
import getFirebaseServices from '../getFirebaseServices';
import userCollectionPathSegment from './userCollectionPathSegment';
import userConverter from './userConverter';

function getUserDocRefWithConverter(userId: string) {
  const { firestoreRef } = getFirebaseServices();
  return doc(firestoreRef, userCollectionPathSegment, userId).withConverter(
    userConverter
  );
}

export default getUserDocRefWithConverter;
