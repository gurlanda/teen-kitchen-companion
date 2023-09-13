import { StorageError, deleteObject } from 'firebase/storage';
import getMenuStorageRef from '../References/getMenuStorageRef';

async function deleteMenuFile(fileId: string) {
  try {
    const menuStorageRef = getMenuStorageRef(fileId);
    await deleteObject(menuStorageRef);
  } catch (error) {
    if (
      error instanceof StorageError &&
      error.code === 'storage/object-not-found'
    ) {
      return;
    } else {
      console.log(error);
      return;
    }
  }
}

export default deleteMenuFile;
