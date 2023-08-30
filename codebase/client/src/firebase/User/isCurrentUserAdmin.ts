import getFirebaseServices from '../getFirebaseServices';

async function isCurrentUserAdmin(): Promise<boolean> {
  const { authRef } = getFirebaseServices();

  const { currentUser } = authRef;
  if (!currentUser) {
    return false;
  }

  const userIsAdmin = (await currentUser.getIdTokenResult()).claims.admin as
    | boolean
    | undefined;

  // Cast to boolean
  return !!userIsAdmin;
}

export default isCurrentUserAdmin;
