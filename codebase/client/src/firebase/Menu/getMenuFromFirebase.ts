import { getDoc } from 'firebase/firestore';
import Menu, { StorableMenu } from 'src/model/Menu/Menu';
import getMenuDocRef from './getMenuDocRef';
import MenuFile from 'src/model/Menu/MenuFile';
import getMenuFileFromFirebase from './getMenuFileFromFirebase';

async function getMenuFromFirebase(menuId: string): Promise<Menu | undefined> {
  const menuDocRef = getMenuDocRef(menuId);
  const menuSnapshot = await getDoc(menuDocRef);

  const storableMenu = menuSnapshot.data() as StorableMenu | undefined;
  if (storableMenu === undefined) {
    return undefined;
  }

  const menuFile: MenuFile = await getMenuFileFromFirebase(storableMenu.fileId);
  return Menu.fromStorable(storableMenu, menuFile, menuId);
}

export default getMenuFromFirebase;
