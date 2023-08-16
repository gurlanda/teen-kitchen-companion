import { useContext } from 'react';
import MenuContext from './context/MenuContext';
import PdfViewer from 'src/components/layout/PdfViewer';
import MenuEditForm from './MenuEditForm';

const MenuEditPage = (): JSX.Element => {
  const { previewedFile } = useContext(MenuContext);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-3 pt-5 mx-auto w-[min(90vw,120ch)] h-full">
        <div className="flex gap-3 h-full">
          <MenuEditForm className="grow" />
          <PdfViewer file={previewedFile} className="grow" />
        </div>
      </div>
    </div>
  );
};

export default MenuEditPage;
