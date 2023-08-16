import { deleteDoc } from 'firebase/firestore';
import getMenuDocRef from './getMenuDocRefWithConverter';

async function deleteMenu(menuId: string) {
  const menuDocRef = getMenuDocRef(menuId);
  await deleteDoc(menuDocRef);
}

export default deleteMenu;
