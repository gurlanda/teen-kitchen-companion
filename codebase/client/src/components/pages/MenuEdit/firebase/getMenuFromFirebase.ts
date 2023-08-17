import { getDoc } from 'firebase/firestore';
import Menu, { StorableMenu } from '../model/Menu';
import getMenuDocRef from './getMenuDocRef';
import getMenuCloudStorageUrl from './getMenuStorageUrl';
import MenuFile from '../model/MenuFile';

async function getMenuFromFirebase(menuId: string): Promise<Menu | undefined> {
  const menuDocRef = getMenuDocRef(menuId);
  const menuSnapshot = await getDoc(menuDocRef);

  const storableMenu = menuSnapshot.data() as StorableMenu | undefined;
  if (storableMenu === undefined) {
    return undefined;
  }

  let menuFile: MenuFile;
  const fileId = storableMenu.fileId;
  if (fileId !== null) {
    const menuDownloadUrl = await getMenuCloudStorageUrl(menuId);
    menuFile = new MenuFile(menuDownloadUrl, fileId);
  } else {
    menuFile = new MenuFile();
  }

  return Menu.fromStorable(storableMenu, menuFile, menuId);
}

export default getMenuFromFirebase;
