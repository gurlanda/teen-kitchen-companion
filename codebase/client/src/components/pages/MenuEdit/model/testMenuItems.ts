import MenuItem from './MenuItem';
import example1Pdf from 'src/assets/pdf/example1.pdf';
import example2Pdf from 'src/assets/pdf/example2.pdf';
import example3Pdf from 'src/assets/pdf/example3.pdf';
import example4Pdf from 'src/assets/pdf/example4.pdf';

const testMenuItems: MenuItem[] = [
  new MenuItem(new Date(2023, 7, 7), example1Pdf),
  new MenuItem(new Date(2023, 7, 14), example2Pdf),
  new MenuItem(new Date(2023, 7, 21), example3Pdf),
  new MenuItem(new Date(2023, 7, 28), example4Pdf),
  new MenuItem(new Date(2023, 8, 4), example1Pdf),
];

export default testMenuItems;
