import { updateDoc } from 'firebase/firestore';
import Menu from '../model/Menu';
import getMenuDocRef from './getMenuDocRef';

async function updateMenuDate(menu: Menu, newStartDate: Date) {
  const newMenuData = menu.toStorable();
  newMenuData.startDate = new Date(newStartDate);

  const menuDocRef = getMenuDocRef(menu.id);
  await updateDoc(menuDocRef, newMenuData);
}

export default updateMenuDate;
