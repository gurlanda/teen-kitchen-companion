import { StorageError, getDownloadURL, uploadBytes } from 'firebase/storage';
import MenuFile from 'src/model/Menu/MenuFile';
import getMenuStorageRef from '../References/getMenuStorageRef';
import getBlobFromUrl from 'src/utils/getBlobFromUrl';
import doesMenuFileExist from './doesMenuFileExist';

// If the local file doesn't exist on the server, this uploads the file and returns its storage URL as a MenuFile.
// If the local file does exist on the server, this function skips the upload and returns the storage URL of the existing file as a MenuFile.
// Returns null if the upload wasn't successful.
async function uploadNewMenuFile(
  localMenuFile: MenuFile
): Promise<MenuFile | null> {
  const fileId = localMenuFile.id;
  const menuStorageRef = getMenuStorageRef(fileId);

  try {
    const menuFileExists = await doesMenuFileExist(fileId);
    if (menuFileExists === null) {
      // An error occured
      return null;
    } else if (menuFileExists) {
      // If there's no error, then the file exists.
      // Since the file exists on the server, we're done.
      const menuFileUrl = await getDownloadURL(menuStorageRef);
      return new MenuFile(menuFileUrl, fileId);
    } else {
      // The file doesn't exist
      return await upload();
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  async function upload(): Promise<MenuFile> {
    const fileUrl = localMenuFile.url;
    if (fileUrl === null) {
      return new MenuFile(null, fileId);
    }

    const menuBlob = await getBlobFromUrl(fileUrl);
    await uploadBytes(menuStorageRef, menuBlob);
    const menuFileUrl = await getDownloadURL(menuStorageRef);
    return new MenuFile(menuFileUrl, fileId);
  }
}

export default uploadNewMenuFile;
