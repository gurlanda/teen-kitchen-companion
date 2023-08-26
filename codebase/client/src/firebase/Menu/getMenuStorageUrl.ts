import { getDownloadURL } from 'firebase/storage';
import getMenuStorageRef from './getMenuStorageRef';

async function getMenuStorageUrl(menuFileId: string): Promise<string | null> {
  try {
    const menuStorageRef = getMenuStorageRef(menuFileId);
    const downloadUrl = await getDownloadURL(menuStorageRef);
    return downloadUrl;
  } catch (error) {
    return null;
  }
}

export default getMenuStorageUrl;
