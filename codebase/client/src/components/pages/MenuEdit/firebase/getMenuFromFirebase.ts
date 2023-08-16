import { getDoc } from 'firebase/firestore';
import Menu, { StorableMenu } from '../model/Menu';
import getMenuDocRef from './getMenuDocRefWithConverter';
import getMenuCloudStorageUrl from './getMenuStorageUrl';

async function getMenuFromFirebase(menuId: string): Promise<Menu | undefined> {
  const menuDocRef = getMenuDocRef(menuId);
  const menuSnapshot = await getDoc(menuDocRef);

  const storableMenu = menuSnapshot.data() as StorableMenu | undefined;
  if (storableMenu === undefined) {
    return undefined;
  }

  const menuDownloadUrl = await getMenuCloudStorageUrl(menuId);
  return Menu.fromStorable(storableMenu, menuDownloadUrl, menuId);
}

export default getMenuFromFirebase;
