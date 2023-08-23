import React, { useEffect, useState } from 'react';
import PdfViewer from 'src/components/layout/PdfViewer';
import example1Pdf from 'src/assets/pdf/example1.pdf';
import example2Pdf from 'src/assets/pdf/example2.pdf';
import example3Pdf from 'src/assets/pdf/example3.pdf';
import example4Pdf from 'src/assets/pdf/example4.pdf';
import EmailForm from 'src/components/layout/EmailForm';
import getMenusAvailableToClients from '../MenuEdit/firebase/getMenusAvailableToClients';
import MenuType from '../MenuEdit/model/Menu';
import Loading from 'src/components/layout/Loading';
import format from 'date-fns/format';
import add from 'date-fns/add';

const Menu: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string>(example1Pdf);
  const [menus, setMenus] = useState<MenuType[] | null>(null);
  const [currentMenu, setCurrentMenu] = useState<MenuType | null>(null);

  useEffect(() => {
    async function loadMenus() {
      const fetchedMenus = await getMenusAvailableToClients();
      setMenus(fetchedMenus);

      if (fetchedMenus.length > 0) {
        setCurrentMenu(fetchedMenus[0]);
      }
    }

    loadMenus();
  }, []);

  const FileChoiceButton = ({
    file,
    children,
  }: {
    file: string;
    children?: React.ReactNode;
  }): JSX.Element => {
    function onClick() {
      setFileUrl(file);
    }

    return (
      <Button onClick={onClick} className="font-medium">
        {children}
      </Button>
    );
  };

  const MenuChoiceButton = ({ menu }: { menu: MenuType }): JSX.Element => {
    function onClick() {
      setCurrentMenu(menu);
    }

    function weekRangeText(): string {
      const endOfWeek: Date = add(menu.startDate, { days: 6 });
      return `${formatDate(menu.startDate)} to ${formatDate(endOfWeek)}`;

      function formatDate(date: Date): string {
        const formatString = 'M/d';
        const dateString = format(date, formatString);
        return dateString;
      }
    }

    const isChosen = menu.id === currentMenu?.id;

    return (
      <Button
        onClick={onClick}
        className={`font-medium ${isChosen && 'bg-brand-teal text-white'}`}
      >
        {weekRangeText()}
      </Button>
    );
  };

  return menus === null ? (
    <Loading />
  ) : (
    <div className="h-full font-body">
      <div className="flex flex-col h-full pb-20 mx-auto max-w-[min(90vw,100ch)]">
        <h1 className="font-heading text-5xl font-bold text-center">
          Weekly Menus
        </h1>

        {/* Menu select */}
        <div className="flex py-5 px-10 justify-center gap-2">
          {/* File buttons */}
          <div className="flex gap-2">
            {menus.map((menu, index) => (
              <MenuChoiceButton key={index} menu={menu} />
            ))}
          </div>
        </div>

        <div className="min-h-full flex flex-col gap-4">
          <PdfViewer file={currentMenu?.file.url ?? null} className="grow-[2]">
            Unfortunately, no menu has been uploaded for this week. Please
            choose a different week's menu to view.
          </PdfViewer>
          <EmailForm
            className="grow-[1]"
            header="Send a message to our registered dietician"
            content="You can contact our registered dietition for a free consultation.
            Fill out this form to make an appointment or chat with them about
            your meals!"
          />
        </div>
      </div>
    </div>
  );
};

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

export default Menu;
