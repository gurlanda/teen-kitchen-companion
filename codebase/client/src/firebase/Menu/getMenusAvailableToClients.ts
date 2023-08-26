import { Timestamp, limit, orderBy, query, startAt } from 'firebase/firestore';
import Menu from 'src/model/Menu/Menu';
import menusCollectionRef from './menusCollectionRef';
import getMenus from './getMenus';
import numMenusAvailableToClients from './numMenusAvailableToClients';

async function getMenusAvailableToClients(): Promise<Menu[]> {
  try {
    const now: Timestamp = Timestamp.now();
    const allMenusQuery = query(
      menusCollectionRef,
      orderBy('startDate', 'desc'),
      startAt(now),
      limit(numMenusAvailableToClients)
    );

    const menus = await getMenus(allMenusQuery);
    return menus;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getMenusAvailableToClients;
