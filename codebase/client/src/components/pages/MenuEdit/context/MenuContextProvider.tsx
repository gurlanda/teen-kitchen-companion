import { useState } from 'react';
import MenuContext from './MenuContext';
import example1Pdf from 'src/assets/pdf/example1.pdf';
import example2Pdf from 'src/assets/pdf/example2.pdf';
import example3Pdf from 'src/assets/pdf/example3.pdf';
import example4Pdf from 'src/assets/pdf/example4.pdf';

const MenuContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [previewedFile, setPreviewedFile] = useState<string>(example4Pdf);

  const providedValues = {
    previewedFile,
    setPreviewedFile,
  };

  return (
    <MenuContext.Provider value={providedValues}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
