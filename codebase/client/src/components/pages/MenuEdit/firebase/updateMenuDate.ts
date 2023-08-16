import { updateDoc } from 'firebase/firestore';
import { StorableMenu } from '../model/Menu';
import getMenuDocRef from './getMenuDocRefWithConverter';

async function updateMenuDate(newStartDate: Date, menuId: string) {
  const newMenuData: StorableMenu = {
    startDate: newStartDate,
  };
  const menuDocRef = getMenuDocRef(menuId);
  await updateDoc(menuDocRef, newMenuData);
}

export default updateMenuDate;
