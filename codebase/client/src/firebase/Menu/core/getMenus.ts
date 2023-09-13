import { Query, getDocs } from 'firebase/firestore';
import Menu from 'src/model/Menu/Menu';
import downloadFile from './downloadFile';
import menuConverter from '../References/menuConverter';

async function getMenus(query: Query): Promise<Menu[]> {
  try {
    const queryWithConverter = query.withConverter(menuConverter);
    const snapshot = await getDocs(queryWithConverter);
    const menusFromFirestore = snapshot.docs.map(function snapshotToMenu(doc) {
      const menu = doc.data();

      // Request the menu file so that Workbox can cache the response for offline usage
      const downloadUrl = menu.file.url;
      if (typeof downloadUrl === 'string') {
        downloadFile(downloadUrl);
      }

      return menu;
    });

    return menusFromFirestore;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getMenus;
