import Menu from '../model/Menu';
import { uploadBytes } from 'firebase/storage';
import getMenuStorageRef from './getMenuStorageRef';
import getMenuStorageUrl from './getMenuStorageUrl';
import getMenuDocRef from './getMenuDocRefWithConverter';
import { setDoc } from 'firebase/firestore';

async function uploadNewMenu(localMenuItem: Menu) {
  try {
    const menuStorageRef = getMenuStorageRef(localMenuItem.id);

    if (localMenuItem.fileUrl !== '') {
      const menuBlob = await getBlobFromUrl(localMenuItem.fileUrl);
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
