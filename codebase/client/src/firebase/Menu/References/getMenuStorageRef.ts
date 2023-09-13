import { StorageReference, ref } from 'firebase/storage';
import menusPathSegment from './menusPathSegment';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

function getMenuStorageRef(menuFileId: string): StorageReference {
  const { storageRef } = getFirebaseServices();
  return ref(storageRef, `${menusPathSegment}/${menuFileId}.pdf`);
}

export default getMenuStorageRef;
