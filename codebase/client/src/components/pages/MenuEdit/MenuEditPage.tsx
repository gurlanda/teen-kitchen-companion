import { useContext } from 'react';
import MenuContext from './context/MenuContext';
import PdfViewer from 'src/components/layout/PdfViewer';
import MenuEditForm from './MenuEditForm';

/**
 
  Todo:
    + Implement: StorableMenuItem <-> MenuEditForm item
    + Set up the context
    + Implement: The context contains real dates and files
    - Implement: Clicking on a MenuEditForm item changes the previewed file
    - Implement: DnD works properly
    - Implement: File upload changes a MenuEditForm item
    - Implement: View that represents an empty file in a slot
    - Implement: Add new week
    - Implement: Proper UI for MenuEditForm

 */

const MenuEditPage = (): JSX.Element => {
  const { previewedFile } = useContext(MenuContext);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-3 pt-5 mx-auto w-[min(90vw,100ch)] h-full">
        {/* <h1 className="text-xl font-bold">Menu edit</h1> */}
        <div className="flex gap-3 h-full">
          <MenuEditForm className="grow" />
          <PdfViewer file={previewedFile} className="grow" />
        </div>
      </div>
    </div>
  );
};

export default MenuEditPage;
