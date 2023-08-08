// Converts a list of menus from a server-storable shape to a shape that's usable by MenuEditForm.
// TODO: Re-evaluate. I think this object should stay in the MenuEdit folder because it is only used by MenuEditForm. But this could change over the course of development.
// TODO: Convert to a FirestoreConverter.

import MenuItem from './MenuItem';

const menuItemConverter = {
  fromServer(menuItems: MenuItem[]): { dates: Date[]; files: string[] } {
    const dates: Date[] = [];
    const files: string[] = [];

    for (let item of menuItems) {
      dates.push(item.startDate);
      files.push(item.fileUrl);
    }

    return {
      dates,
      files,
    };
  },

  // Returns null if dates.length !== files.length
  toServer(dates: Date[], files: string[]): MenuItem[] | null {
    if (dates.length !== files.length) {
      return null;
    }

    const numItems = dates.length;
    if (numItems === 0) {
      return [];
    }

    const menuItems: MenuItem[] = [];
    for (let i = 0; i < numItems; i++) {
      const menuItem = new MenuItem(dates[i], files[i]);
      menuItems.push(menuItem);
    }

    return menuItems;
  },
};

export default menuItemConverter;
