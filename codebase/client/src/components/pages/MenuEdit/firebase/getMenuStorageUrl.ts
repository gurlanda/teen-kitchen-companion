import { getDownloadURL } from 'firebase/storage';
import getMenuStorageRef from './getMenuStorageRef';

async function getMenuStorageUrl(menuId: string): Promise<string> {
  const menuStorageRef = getMenuStorageRef(menuId);
  const downloadUrl = await getDownloadURL(menuStorageRef);
  return downloadUrl;
}

export default getMenuStorageUrl;
