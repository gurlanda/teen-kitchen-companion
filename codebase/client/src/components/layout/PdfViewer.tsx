import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const PdfViewer = ({
  className,
  file,
  children,
}: {
  className?: string;
  file: string | null;
  children?: React.ReactNode;
}): JSX.Element => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className={`h-full border rounded-xl overflow-hidden ${className}`}>
      {file ? (
        <object
          data={file}
          type="application/pdf"
          className="min-h-full w-full"
        >
          <div className="px-4 py-2">
            {
              {
                [SupportedLanguage.ENGLISH]:
                  'No online PDF viewer installed on this browser. Please consider using Firefox, which will allow this feature to work.',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </div>
        </object>
      ) : (
        <div className="px-4 py-2">{children}</div>
      )}
    </div>
  );
};

export default PdfViewer;
