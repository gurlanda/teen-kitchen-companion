import { useState } from 'react';
import {
  Duration,
  add,
  isSunday,
  previousSunday,
  startOfToday,
} from 'date-fns';
import MenuContext from './MenuContext';
import MenuFile from 'src/model/Menu/MenuFile';
import menuItemConverter from 'src/model/Menu/menuItemConverter';
import MenuDate from 'src/model/Menu/MenuDate';
import Menu from 'src/model/Menu/Menu';
import setMenu from 'src/firebase/Menu/core/setMenu';

const MenuContextProvider = ({
  menus,
  children,
}: {
  menus: Menu[];
  children?: React.ReactNode;
}): JSX.Element => {
  const { files: receivedFiles, dates: receivedDates } =
    menuItemConverter.separate(menus);
  const [previewedFile, setPreviewedFile] = useState<string | null>(
    (() => {
      if (receivedFiles === undefined || receivedFiles.length === 0) {
        return null;
      }

      return receivedFiles[0].url;
    })()
  );
  const [files, setFiles] = useState<MenuFile[]>(receivedFiles);
  const [dates, setDates] = useState<MenuDate[]>(receivedDates);
  const [originalMenus, setOriginalMenus] = useState<Menu[]>(
    menus.map((menu) => menu.clone())
  );

  function isDataChanged(): boolean {
    const currentMenus = menuItemConverter.combine(dates, files);
    if (currentMenus === null) {
      return true;
    }

    if (currentMenus.length !== originalMenus.length) {
      return true;
    }

    let areChangesPresent: boolean = false;
    for (let i = 0; i < currentMenus.length; i++) {
      const localMenu = currentMenus[i];
      const serverMenu = originalMenus[i];
      if (!localMenu.equals(serverMenu)) {
        areChangesPresent = true;
        break;
      }
    }

    // console.dir({
    //   areChangesPresent,
    // });

    return areChangesPresent;
  }

  function changeFile(
    targetIndex: number,
    fileUrl: string | null = null
  ): void {
    const newFiles = files.map((file, index) => {
      if (index === targetIndex) {
        return new MenuFile(fileUrl, file.id);
      } else {
        return file.clone();
      }
    });

    // console.dir({
    //   localMenus: menuItemConverter.combine(dates, newFiles),
    //   serverMenus: menus,
    // });

    setFiles(newFiles);
  }

  function deleteFile(targetIndex: number) {
    changeFile(targetIndex);
  }

  function moveFile(fromIndex: number, toIndex: number) {
    if (!isValidIndex(fromIndex, files) || !isValidIndex(toIndex, files)) {
      return;
    }

    const newFiles = files.map((file) => file.clone());
    const targetFile = newFiles.splice(fromIndex, 1)[0];
    newFiles.splice(toIndex, 0, targetFile);

    setFiles(newFiles);
  }

  function addNewWeek(): void {
    let newDate: Date;

    if (dates.length > 0) {
      const latestDate = new Date(dates[0].startDate);
      const oneWeek: Duration = {
        weeks: 1,
      };

      newDate = add(latestDate, oneWeek);
    } else {
      const today = startOfToday();

      let closestSunday: Date;
      if (isSunday(today)) {
        closestSunday = today;
      } else {
        closestSunday = previousSunday(today);
      }

      newDate = closestSunday;
    }

    const newDates: MenuDate[] = [
      new MenuDate(newDate),
      ...dates.map((date) => date.clone()),
    ];

    setDates(newDates);

    const newFiles = [new MenuFile(), ...files.map((file) => file.clone())];
    setFiles(newFiles);
  }

  function deleteWeek(targetIndex: number): void {
    const newDates = dates
      .filter((date, index) => index !== targetIndex)
      .map((date) => date.clone());
    setDates(newDates);

    const newFiles = files
      .filter((file, index) => index !== targetIndex)
      .map((file) => file.clone());
    setFiles(newFiles);
  }

  async function uploadAllFiles() {
    try {
      const menus = menuItemConverter.combine(dates, files);

      // TODO: Remove or replace on deployment
      if (menus === null || menus.length < 1) {
        window.alert('No menus to upload');
        return;
      }

      const originalMenusMap = new Map<string, Menu>(
        originalMenus.map((menu) => [menu.id, menu])
      );

      for (let i = 0; i < menus.length; i++) {
        const currentMenu = menus[i];
        const originalMenu = originalMenusMap.get(currentMenu.id);

        const menuDidChange: boolean =
          originalMenu === undefined || !currentMenu.equals(originalMenu);
        if (menuDidChange) {
          const uploadedMenu = await setMenu(currentMenu);
          if (uploadedMenu === null) {
            throw {
              menu: menus[i],
              message: 'An error occured while uploading the menu',
            };
          }

          menus[i] = uploadedMenu;
        }
      }

      setOriginalMenus(menus);
    } catch (error) {
      console.log(error);
    }
  }

  const providedValues = {
    previewedFile,
    files,
    dates,
    setPreviewedFile,
    changeFile,
    moveFile,
    deleteFile,
    uploadAllFiles,
    addNewWeek,
    deleteWeek,
    isDataChanged,
  };

  return (
    <MenuContext.Provider value={providedValues}>
      {children}
    </MenuContext.Provider>
  );
};

function isValidIndex(index: number, array: Array<any>): boolean {
  if (index < 0 || index >= array.length) {
    return false;
  } else {
    return true;
  }
}

export default MenuContextProvider;
