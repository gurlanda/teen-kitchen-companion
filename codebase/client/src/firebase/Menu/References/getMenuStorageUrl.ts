import { getBlob, getDownloadURL } from 'firebase/storage';
import getMenuStorageRef from './getMenuStorageRef';

async function getMenuStorageUrl(menuFileId: string): Promise<string | null> {
  try {
    const menuStorageRef = getMenuStorageRef(menuFileId);
    const downloadUrl = await getDownloadURL(menuStorageRef);
    return downloadUrl;

    // const menuStorageRef = getMenuStorageRef(menuFileId);
    // const menuBlob = await getBlob(menuStorageRef);
    // return URL.createObjectURL(menuBlob);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default getMenuStorageUrl;
