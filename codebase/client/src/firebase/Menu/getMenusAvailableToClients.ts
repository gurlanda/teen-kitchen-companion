import { Timestamp, limit, orderBy, query, startAt } from 'firebase/firestore';
import Menu from 'src/model/Menu/Menu';
import menusCollectionRef from './References/menusCollectionRef';
import getMenus from './core/getMenus';
import numMenusAvailableToClients from './numMenusAvailableToClients';
import startOfToday from 'date-fns/startOfToday';
import isSunday from 'date-fns/isSunday';
import previousSunday from 'date-fns/previousSunday';

async function getMenusAvailableToClients(): Promise<Menu[]> {
  try {
    const allMenusQuery = query(
      menusCollectionRef,
      orderBy('startDate', 'asc'),
      startAt(lastSunday()),
      limit(numMenusAvailableToClients)
    );

    const menus = await getMenus(allMenusQuery);
    return menus;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function lastSunday(): Timestamp {
  const today = startOfToday();

  let lastSunday: Date;
  if (isSunday(today)) {
    lastSunday = today;
  } else {
    lastSunday = previousSunday(today);
  }

  return Timestamp.fromDate(lastSunday);
}

export default getMenusAvailableToClients;
