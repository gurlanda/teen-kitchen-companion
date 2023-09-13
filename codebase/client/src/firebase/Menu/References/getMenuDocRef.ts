import { DocumentData, DocumentReference, doc } from 'firebase/firestore';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import menusPathSegment from './menusPathSegment';
import menuConverter from './menuConverter';
import Menu from 'src/model/Menu/Menu';

function getMenuDocRef(menuId: string): DocumentReference<Menu> {
  const { firestoreRef } = getFirebaseServices();
  const menuDocRef = doc(
    firestoreRef,
    `${menusPathSegment}/${menuId}`
  ).withConverter(menuConverter);
  return menuDocRef;
}

export default getMenuDocRef;
