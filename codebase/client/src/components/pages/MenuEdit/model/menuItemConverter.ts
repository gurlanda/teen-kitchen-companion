// Converts a list of menus from a server-storable shape to a shape that's usable by MenuEditForm.
// TODO: Re-evaluate. I think this object should stay in the MenuEdit folder because it is only used by MenuEditForm. But this could change over the course of development.
// TODO: Convert to a FirestoreConverter.

import Menu from './Menu';
import MenuFile from './MenuFile';

const menuItemConverter = {
  fromServer(menuItems: Menu[]): { dates: Date[]; files: MenuFile[] } {
    const dates: Date[] = [];
    const files: MenuFile[] = [];

    for (let item of menuItems) {
      dates.push(item.startDate);
      files.push(new MenuFile(item.fileUrl));
    }

    return {
      dates,
      files,
    };
  },

  // Returns null if dates.length !== files.length
  toServer(dates: Date[], files: MenuFile[]): Menu[] | null {
    if (dates.length !== files.length) {
      return null;
    }

    const numItems = dates.length;
    if (numItems === 0) {
      return [];
    }

    const menuItems: Menu[] = [];
    for (let i = 0; i < numItems; i++) {
      const menuItem = new Menu(dates[i], files[i].url);
      menuItems.push(menuItem);
    }

    return menuItems;
  },
};

export default menuItemConverter;
