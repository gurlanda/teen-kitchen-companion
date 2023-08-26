import { uploadBytes } from 'firebase/storage';
import MenuFile from 'src/model/Menu/MenuFile';
import getMenuStorageRef from './getMenuStorageRef';
import getBlobFromUrl from 'src/utils/getBlobFromUrl';

async function uploadMenuFile(menuFile: MenuFile): Promise<void> {
  // TODO: Abort if already exists
  const menuStorageRef = getMenuStorageRef(menuFile.id);
  const fileUrl = menuFile.url;
  if (fileUrl && fileUrl !== '') {
    const menuBlob = await getBlobFromUrl(fileUrl);
    await uploadBytes(menuStorageRef, menuBlob);
  }
}

export default uploadMenuFile;
