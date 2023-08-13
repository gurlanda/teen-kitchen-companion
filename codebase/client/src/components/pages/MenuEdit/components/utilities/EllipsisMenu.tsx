import { ReactNode, useEffect } from 'react';

const EllipsisMenu = ({
  isVisible,
  setIsVisible,
  children,
  id,
}: {
  isVisible: boolean;
  setIsVisible: (newVisibility: boolean) => void;
  children?: ReactNode;
  id: string;
}): JSX.Element => {
  useEffect(() => {
    type DocumentClickEventListener = Parameters<
      typeof document.addEventListener
    >[1];
    const hideWhenClickedOutside: DocumentClickEventListener = (e) => {
      const thisMenu = document.getElementById(id);
      if (!thisMenu) {
        return;
      }

      if (!(e.target instanceof Element)) {
        return;
      }
      const clickTarget = e.target;

      if (!thisMenu.contains(clickTarget)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', hideWhenClickedOutside);

    return () => {
      document.removeEventListener('click', hideWhenClickedOutside);
    };
  }, []);

  return (
    <div
      className={`absolute left-[calc(100%_+_8px)] top-1/2 -translate-y-1/2 bg-white border rounded-lg overflow-hidden ${
        isVisible ? '' : 'hidden'
      }`}
      id={id}
    >
      {children}
    </div>
  );
};

export const EllipsisMenuItem = ({
  onClick,
  children,
}: {
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <button
      className="bg-white hover:bg-gray-50 active:bg-gray-100 px-4 py-2 w-full min-w-max"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default EllipsisMenu;
