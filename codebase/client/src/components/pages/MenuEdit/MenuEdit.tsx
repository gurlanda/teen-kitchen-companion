import { useEffect, useState } from 'react';
import MenuContextProvider from './context/MenuContextProvider';
import MenuEditPage from './MenuEditPage';
import Menu from './model/Menu';
import getAllMenus from './firebase/getAllMenus';
import Loading from 'src/components/layout/Loading';

const MenuEdit = ({}: {}): JSX.Element => {
  const [menus, setMenus] = useState<Menu[] | null>(null);

  useEffect(() => {
    async function retrieveMenus() {
      const retrievedMenus = await getAllMenus();
      console.log(retrievedMenus);
      setMenus(retrievedMenus);
    }

    retrieveMenus();
  }, []);

  if (menus === null) {
    return <Loading />;
  } else {
    return (
      <MenuContextProvider menus={menus}>
        <MenuEditPage />
      </MenuContextProvider>
    );
  }
};

export default MenuEdit;
