import { FirestoreDataConverter } from 'firebase/firestore';
import Menu, { StorableMenu } from 'src/model/Menu/Menu';

const menuConverter: FirestoreDataConverter<Menu> = {
  fromFirestore(snapshot) {
    const storable: StorableMenu = snapshot.data() as StorableMenu;
    const menuId = snapshot.ref.id;
    return Menu.fromStorable(storable, menuId);
  },

  toFirestore(menu: Menu): StorableMenu {
    return menu.toStorable();
  },
};

export default menuConverter;
