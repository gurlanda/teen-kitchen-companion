import Menu from './Menu';
import example1Pdf from 'src/assets/pdf/example1.pdf';
import example2Pdf from 'src/assets/pdf/example2.pdf';
import example3Pdf from 'src/assets/pdf/example3.pdf';
import example4Pdf from 'src/assets/pdf/example4.pdf';
import MenuFile from './MenuFile';

const testMenuItems: Menu[] = [
  new Menu(new Date(2023, 7, 28), new MenuFile(example4Pdf)),
  new Menu(new Date(2023, 7, 21), new MenuFile(example3Pdf)),
  new Menu(new Date(2023, 7, 14), new MenuFile()),
  new Menu(new Date(2023, 7, 7), new MenuFile(example2Pdf)),
  new Menu(new Date(2023, 6, 31), new MenuFile(example1Pdf)),
];

export default testMenuItems;
