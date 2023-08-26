import { getDownloadURL } from 'firebase/storage';
import getMenuStorageRef from './getMenuStorageRef';

async function getMenuStorageUrl(menuFileId: string): Promise<string> {
  const menuStorageRef = getMenuStorageRef(menuFileId);
  const downloadUrl = await getDownloadURL(menuStorageRef);
  return downloadUrl;
}

export default getMenuStorageUrl;
