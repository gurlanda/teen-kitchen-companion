import { StorageError, getDownloadURL, uploadBytes } from 'firebase/storage';
import MenuFile from 'src/model/Menu/MenuFile';
import getMenuStorageRef from '../References/getMenuStorageRef';
import getBlobFromUrl from 'src/utils/getBlobFromUrl';
import doesMenuFileExist from './doesMenuFileExist';
import deleteMenuFile from './deleteMenuFile';

// If the local file doesn't exist on the server, this uploads the file and returns its storage URL as a MenuFile.
// If the local file does exist on the server, this function deletes the existing file, then uploads the local file.
// Returns null if the upload wasn't successful.
async function setMenuFile(localMenuFile: MenuFile): Promise<MenuFile | null> {
  const fileId = localMenuFile.id;
  const menuStorageRef = getMenuStorageRef(fileId);

  try {
    const menuFileExists = await doesMenuFileExist(fileId);
    if (menuFileExists === null) {
      // An error occured
      return null;
    } else if (menuFileExists) {
      // If there's no error, then the file exists.
      await deleteMenuFile(fileId);
    }

    return await upload();
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

export default setMenuFile;
