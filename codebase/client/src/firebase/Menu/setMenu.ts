import Menu from 'src/model/Menu/Menu';
import getMenuDocRef from './getMenuDocRef';
import getMenuStorageUrl from './getMenuStorageUrl';
import uploadMenuFile from './uploadMenuFile';
import { setDoc } from 'firebase/firestore';

async function setMenu(newMenuData: Menu): Promise<void> {
  // If the menu file doesn't exist, upload it
  const menuFileUrl = await getMenuStorageUrl(newMenuData.file.id);
  const menuFileDoesNotExist: boolean = typeof menuFileUrl !== 'string';
  if (menuFileDoesNotExist) {
    await uploadMenuFile(newMenuData.file);
  }

  const menuDocRef = getMenuDocRef(newMenuData.id);
  await setDoc(menuDocRef, newMenuData.toStorable());
}

export default setMenu;
