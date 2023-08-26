import Menu from '../../model/Menu/Menu';
import { uploadBytes } from 'firebase/storage';
import getMenuStorageRef from './getMenuStorageRef';
import getMenuDocRef from './getMenuDocRef';
import { setDoc } from 'firebase/firestore';

async function uploadNewMenu(localMenuItem: Menu) {
  try {
    // TODO: Abort if already exists
    const menuStorageRef = getMenuStorageRef(localMenuItem.file.id);

    const fileUrl = localMenuItem.file.url;
    if (fileUrl && fileUrl !== '') {
      const menuBlob = await getBlobFromUrl(fileUrl);
      await uploadBytes(menuStorageRef, menuBlob);
    }

    // Create a new Firestore entry for the menu item
    const menuDocRef = getMenuDocRef(localMenuItem.id);
    await setDoc(menuDocRef, localMenuItem.toStorable());
  } catch (error) {
    console.log(error);
  }
}

async function getBlobFromUrl(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}

export default uploadNewMenu;
