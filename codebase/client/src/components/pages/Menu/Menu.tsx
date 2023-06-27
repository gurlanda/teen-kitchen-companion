import React, { useState } from 'react';
import PdfViewer from 'src/components/layout/PdfViewer';
import example1Pdf from 'src/assets/pdf/example1.pdf';
import example2Pdf from 'src/assets/pdf/example2.pdf';
import example3Pdf from 'src/assets/pdf/example3.pdf';
import example4Pdf from 'src/assets/pdf/example4.pdf';

const Button = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`border rounded-lg px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Menu: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string>(example1Pdf);

  const FileChoiceButton = ({
    file,
    children,
  }: {
    file: string;
    children?: React.ReactNode;
  }): JSX.Element => {
    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
      setFileUrl(file);
    }

    return (
      <Button onClick={onClick} className="font-medium">
        {children}
      </Button>
    );
  };

  return (
    <div className="h-full tk-acumin-pro-semi-condensed text-gray-700">
      <div className="flex flex-col h-full pb-20 mx-auto max-w-[min(90vw,90ch)]">
        <h1 className="tk-acumin-pro-condensed text-4xl font-bold text-center">
          Weekly Menus
        </h1>
        {/* Menu select */}
        <div className="flex py-5 px-10 justify-center gap-2">
          {/* File buttons */}
          <div className="flex gap-2">
            <FileChoiceButton file={example1Pdf}>Week 1</FileChoiceButton>
            <FileChoiceButton file={example2Pdf}>Week 2</FileChoiceButton>
            <FileChoiceButton file={example3Pdf}>Week 3</FileChoiceButton>
            <FileChoiceButton file={example4Pdf}>Week 4</FileChoiceButton>
          </div>

          {/* File upload */}
          {/* <div className="flex gap-2 ml-auto items-center">
            <input type="file" accept=".pdf" onChange={onChooseFile} />
            <Button onClick={uploadFileToDb}>Upload file</Button>
          </div> */}
        </div>

        <div className="h-full flex flex-col">
          <PdfViewer file={fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
