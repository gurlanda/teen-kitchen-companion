const PdfViewer = ({
  className,
  file,
  children,
}: {
  className?: string;
  file: string | null;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <div className={`h-full border rounded-xl overflow-hidden ${className}`}>
      {file ? (
        <object
          data={file}
          type="application/pdf"
          className="min-h-full w-full"
        >
          <div className="px-4 py-2">
            No online PDF viewer installed on this browser. Please consider
            using Firefox, which will allow this feature to work.
          </div>
        </object>
      ) : (
        <div className="px-4 py-2">{children}</div>
      )}
    </div>
  );
};

export default PdfViewer;
