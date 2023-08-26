import Menu from '../../model/Menu/Menu';
import getMenuDocRef from './getMenuDocRef';
import { setDoc } from 'firebase/firestore';
import uploadMenuFile from './uploadMenuFile';

async function uploadNewMenu(localMenuItem: Menu) {
  try {
    // TODO: Abort if file already exists
    await uploadMenuFile(localMenuItem.file);

    // Create a new Firestore entry for the menu item
    const menuDocRef = getMenuDocRef(localMenuItem.id);
    await setDoc(menuDocRef, localMenuItem.toStorable());
  } catch (error) {
    console.log(error);
  }
}

export default uploadNewMenu;
