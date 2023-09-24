import { useContext, useEffect, useState } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import PdfViewer from 'src/components/layout/PdfViewer';
import EmailForm from 'src/components/layout/EmailForm';
import getMenusAvailableToClients from 'src/firebase/Menu/getMenusAvailableToClients';
import MenuType from 'src/model/Menu/Menu';
import Loading from 'src/components/layout/Loading';
import format from 'date-fns/format';
import add from 'date-fns/add';
import Button from '../layout/Button';

const Menu: React.FC = () => {
  const { preferredLanguage } = useContext(LanguageContext);
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
      <Button onClick={onClick} primary={isChosen}>
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
          {
            {
              [SupportedLanguage.ENGLISH]: 'Weekly Menus',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
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
            {
              {
                [SupportedLanguage.ENGLISH]: (
                  <>
                    Unfortunately, no menu has been uploaded for this week.
                    Please choose a different week's menu to view.
                  </>
                ),
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </PdfViewer>
          <EmailForm
            className="grow-[1]"
            header={{
              [SupportedLanguage.ENGLISH]:
                'Send a message to our registered dietician',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }}
            content={{
              [SupportedLanguage.ENGLISH]:
                'You can contact our registered dietition for a free consultation. Fill out this form to make an appointment or chat with them about your meals!',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
