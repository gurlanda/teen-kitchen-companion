import MenuContextProvider from './context/MenuContextProvider';
import MenuEditPage from './MenuEditPage';

const MenuEdit = ({}: {}): JSX.Element => {
  return (
    <MenuContextProvider>
      <MenuEditPage />
    </MenuContextProvider>
  );
};

export default MenuEdit;
