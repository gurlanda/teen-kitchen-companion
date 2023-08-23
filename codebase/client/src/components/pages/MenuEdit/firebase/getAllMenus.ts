import { getDocs, query } from 'firebase/firestore';
import Menu, { StorableMenu } from '../model/Menu';
import menusCollectionRef from './menusCollectionRef';
import getMenuFileFromFirebase from './getMenuFileFromFirebase';

async function getAllMenus(): Promise<Menu[]> {
  try {
    const allMenusQuery = query(menusCollectionRef);
    const snapshot = await getDocs(allMenusQuery);
    const menusFromFirestore = snapshot.docs.map((doc) => {
      return {
        storableMenu: doc.data() as StorableMenu,
        menuId: doc.ref.id,
      };
    });

    let menus: Menu[] = [];
    for (let { storableMenu, menuId } of menusFromFirestore) {
      const menuFile = await getMenuFileFromFirebase(storableMenu.fileId);
      const menu = Menu.fromStorable(storableMenu, menuFile, menuId);
      menus.push(menu);
    }

    return menus;
  } catch (error) {
    return [];
  }
}

export default getAllMenus;
