import { StorageError, getDownloadURL } from 'firebase/storage';
import getMenuStorageRef from '../References/getMenuStorageRef';

async function doesMenuFileExist(fileId: string) {
  const menuStorageRef = getMenuStorageRef(fileId);

  try {
    // If there's no error, then the file exists.
    const menuFileUrl = await getDownloadURL(menuStorageRef);
    return true;
  } catch (error) {
    if (
      error instanceof StorageError &&
      error.code === 'storage/object-not-found'
    ) {
      // The file doesn't exist on Storage
      return false;
    } else {
      // Some other error occured
      console.log(error);
      return null;
    }
  }
}

export default doesMenuFileExist;
