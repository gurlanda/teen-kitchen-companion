import { FC} from 'react';
import createId from '../../../../utils/createId';

const ListWithHeader: FC<{
  header: string,
  items: string[],
  type?: "a" | "1" | "i" | "A" | "I",
  ordered?: boolean,
}> = ({ header, items, ordered, type }) => {
  const listItems = items.map((item) => (
    <li className='mb-2' key={createId()}>
      {item}
    </li>
  ));

  const ol = (
    <ol className='list-decimal list-inside' type={type}>
      {listItems}
    </ol>
  );
  const ul = <ul className='list-disc list-inside'>{listItems}</ul>;
  return (
    <>
      <h3 className='font-bold text-lg '>{header}</h3>
      {ordered ? ol : ul}
    </>
  );
};

export default ListWithHeader;
