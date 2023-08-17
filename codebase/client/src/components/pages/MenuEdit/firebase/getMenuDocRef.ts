import { DocumentReference, doc } from 'firebase/firestore';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import menusPathSegment from './menusPathSegment';

function getMenuDocRef(menuId: string): DocumentReference {
  const { firestoreRef } = getFirebaseServices();
  const menuDocRef = doc(firestoreRef, `${menusPathSegment}/${menuId}`);
  return menuDocRef;
}

export default getMenuDocRef;
