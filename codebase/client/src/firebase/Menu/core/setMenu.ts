import Menu from 'src/model/Menu/Menu';
import getMenuDocRef from '../References/getMenuDocRef';
import { setDoc } from 'firebase/firestore';
import setMenuFile from './setMenuFile';

async function setMenu(newMenuData: Menu): Promise<Menu | null> {
  try {
    const uploadedMenuFile = await setMenuFile(newMenuData.file);
    if (uploadedMenuFile === null) {
      throw {
        menuItem: newMenuData,
        error: 'File upload failed',
      };
    }

    const menuToUpload = newMenuData.clone();
    menuToUpload.file = uploadedMenuFile;
    const menuDocRef = getMenuDocRef(menuToUpload.id);
    await setDoc(menuDocRef, menuToUpload);
    return menuToUpload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default setMenu;
