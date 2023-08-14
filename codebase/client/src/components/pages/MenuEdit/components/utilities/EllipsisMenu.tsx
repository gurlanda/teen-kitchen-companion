import { ReactNode, useEffect } from 'react';

const EllipsisMenu = ({
  isVisible,
  setIsVisible,
  children,
  id,
  className,
}: {
  isVisible: boolean;
  setIsVisible: (newVisibility: boolean) => void;
  children?: ReactNode;
  id: string;
  className?: string;
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

    // Add as a capturing event handler
    // There may be some outside elements that have event.stopPropagation() in a click listener. If this event listener is set as a bubbler, then it won't get invoked on such elements.
    document.addEventListener('click', hideWhenClickedOutside, true);

    return () => {
      document.removeEventListener('click', hideWhenClickedOutside);
    };
  }, []);

  return (
    <div
      className={`absolute z-10 left-[calc(100%_+_8px)] top-1/2 -translate-y-1/2 bg-white border rounded-lg overflow-hidden ${
        isVisible ? '' : 'hidden'
      } ${className}`}
      id={id}
      onClick={() => setIsVisible(false)}
    >
      {children}
    </div>
  );
};

export const EllipsisMenuItem = ({
  onClick,
  children,
  className,
}: {
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <button
      className={`bg-white hover:bg-gray-100 active:bg-gray-200 px-4 py-2 w-full min-w-max ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default EllipsisMenu;
