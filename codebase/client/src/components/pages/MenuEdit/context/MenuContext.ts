import { createContext } from 'react';

interface MenuContext {
  previewedFile: string;
  setPreviewedFile(file: string): void;
}

const initialMenuContext: MenuContext = {
  previewedFile: '',
  setPreviewedFile(file: string) {},
};

const menuContext = createContext<MenuContext>(initialMenuContext);
export default menuContext;
