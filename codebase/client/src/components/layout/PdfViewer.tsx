const PdfViewer = ({
  className,
  file,
}: {
  className?: string;
  file: string;
}): JSX.Element => {
  return (
    <div className={`h-full border rounded-xl overflow-hidden ${className}`}>
      <object data={file} type="application/pdf" className="min-h-full w-full">
        <div className="px-4 py-2">
          No online PDF viewer installed on this browser. Please consider using
          Firefox, which will allow this feature to work.
        </div>
      </object>
    </div>
  );
};

export default PdfViewer;
