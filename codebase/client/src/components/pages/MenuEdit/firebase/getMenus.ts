import { Query, getDocs } from 'firebase/firestore';
import Menu, { StorableMenu } from '../model/Menu';
import getMenuFileFromFirebase from './getMenuFileFromFirebase';

async function getMenus(query: Query): Promise<Menu[]> {
  try {
    const snapshot = await getDocs(query);
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
    console.log(error);
    return [];
  }
}

export default getMenus;
