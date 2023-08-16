import { StorageReference, ref } from 'firebase/storage';
import menusPathSegment from './menusPathSegment';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

function getMenuStorageRef(menuId: string): StorageReference {
  const { storageRef } = getFirebaseServices();
  return ref(storageRef, `${menusPathSegment}/${menuId}.pdf`);
}

export default getMenuStorageRef;
