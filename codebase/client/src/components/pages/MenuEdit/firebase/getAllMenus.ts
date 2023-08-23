import { query } from 'firebase/firestore';
import Menu from '../model/Menu';
import getMenus from './getMenus';
import menusCollectionRef from './menusCollectionRef';

async function getAllMenus(): Promise<Menu[]> {
  try {
    const allMenusQuery = query(menusCollectionRef);
    const menus = await getMenus(allMenusQuery);
    return menus;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getAllMenus;
