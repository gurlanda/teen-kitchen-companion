import Menu from '../../../model/Menu/Menu';
import getMenuDocRef from '../References/getMenuDocRef';
import { setDoc } from 'firebase/firestore';
import setMenuFile from './setMenuFile';

async function uploadNewMenu(localMenu: Menu): Promise<Menu | null> {
  try {
    const fileId = localMenu.file.id;
    const serverMenuFile = await setMenuFile(localMenu.file);
    if (serverMenuFile === null) {
      throw {
        menuItem: localMenu,
        error: 'File upload failed',
      };
    }

    // Create a new Firestore entry for the menu item
    const menu = localMenu.clone();
    menu.file = serverMenuFile;
    const menuDocRef = getMenuDocRef(menu.id);
    await setDoc(menuDocRef, menu);
    return menu;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default uploadNewMenu;
