import User from './User';

// StorableUser represents the user's data as stored in the server
// We exclude User.id because the user's ID is already used as the name of the user's document; including User.id in StorableUser would be redundant.
type UserMethods = 'clone' | 'toStorable' | 'toChangePreferredLanguage';
type StorableUser = Omit<User, UserMethods | 'id'>;
export default StorableUser;
