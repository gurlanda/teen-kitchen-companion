import MenuFile from 'src/model/Menu/MenuFile';
import getMenuStorageUrl from './getMenuStorageUrl';

async function getMenuFileFromFirebase(
  menuFileId: string | null
): Promise<MenuFile> {
  if (menuFileId === null) {
    return new MenuFile();
  }

  try {
    // TODO: What if MenuFile DNE?
    const menuDownloadUrl = await getMenuStorageUrl(menuFileId);
    const menuFile = new MenuFile(menuDownloadUrl, menuFileId);
    return menuFile;
  } catch (error) {
    console.log(error);
    return new MenuFile();
  }
}

export default getMenuFileFromFirebase;
