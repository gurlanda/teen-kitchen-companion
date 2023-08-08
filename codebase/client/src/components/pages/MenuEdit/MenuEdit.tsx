import PdfViewer from 'src/components/layout/PdfViewer';
import MenuEditForm from './MenuEditForm';
import example1Pdf from 'src/assets/pdf/example1.pdf';
import example2Pdf from 'src/assets/pdf/example2.pdf';
import example3Pdf from 'src/assets/pdf/example3.pdf';
import example4Pdf from 'src/assets/pdf/example4.pdf';

const MenuEdit = (): JSX.Element => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-3 pt-5 mx-auto w-[min(90vw,100ch)] h-full">
        {/* <h1 className="text-xl font-bold">Menu edit</h1> */}
        <div className="flex gap-3 h-full">
          <MenuEditForm className="grow" />
          <PdfViewer file={example1Pdf} className="grow" />
        </div>
      </div>
    </div>
  );
};

export default MenuEdit;
