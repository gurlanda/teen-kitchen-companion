import MenuContextProvider from './context/MenuContextProvider';
import MenuEditPage from './MenuEditPage';
import menuItemConverter from './model/menuItemConverter';
import testMenuItems from './model/testMenuItems';

const MenuEdit = ({}: {}): JSX.Element => {
  const { files, dates } = menuItemConverter.separate([]);

  return (
    <MenuContextProvider files={files} dates={dates}>
      <MenuEditPage />
    </MenuContextProvider>
  );
};

export default MenuEdit;
