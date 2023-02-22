import axios from 'axios';
import createId from './createId';

// Returns true if and only if we are connected to a network and our polling attempt succeeds
const isOnline = async () => {
  if (!window.navigator.onLine) return false;

  // We use our own origin to prevent CORS errors
  const url = new URL(window.location.origin);

  // Set a random search parameter to make sure no request falls back on the cache
  url.search = new URLSearchParams({
    isonline: createId(), // Returns a random string of a certain length
  }).toString();

  try {
    // HEAD request is sufficient for our needs
    const response = await axios.head(url.toString());

    // Return true if the request was valid
    if (response.status >= 200 && response.status <= 299) return true;
    else return false;
  } catch {
    return false;
  }
};

export default isOnline;
