import React from 'react';
import Form from './Form';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import OptionGroup from './OptionGroup';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Table from './Table';
import Button from './Button';
import Dropdown, { DropdownItem, DropdownDivider } from './Dropdown';

const ExampleForm = () => {
  const dropdownItems = [
    new DropdownItem('Dropdown item', 0),
    new DropdownItem('Another dropdown item', 0),
    new DropdownItem('Yet another dropdown item', 0),
    new DropdownDivider(),
    new DropdownItem('Yet another dropdown item', 0),
  ];

  const cbOptions = [
    'Checkbox input 1',
    'Checkbox input 2',
    'wowee',
    'Checkbox input 3',
    'Checkbox input 4',
  ];

  const rOptions = [
    'Radio input 1',
    'Radio input 2',
    'wowee',
    'Radio input 3',
    'Radio input 4',
  ];

  return (
    <div className='mx-auto mt-5 mb-12 max-w-2xl xl:max-w-3xl'>
      <Form
        title='Survey Title'
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          quisquam quibusdam autem. Obcaecati nam sit quaerat laboriosam esse
          repellat! Optio possimus totam ad qui repellendus.'
      >
        <Dropdown defaultItem={dropdownItems[0]} items={dropdownItems} />
        <TextInput title={'Name'} placeholder={'Text input'} />
        <TextInput
          title={'Another text input'}
          placeholder={'Another text input'}
        />
        <TextAreaInput title={'Paragraph'} placeholder={'Text area'} />
        <OptionGroup title='Checkbox group'>
          {cbOptions.map((opt) => {
            return <Checkbox key={opt} text={opt} />;
          })}
        </OptionGroup>
        <OptionGroup title='Radio group'>
          {rOptions.map((opt) => {
            return <Radio key={opt} text={opt} name='radio' />;
          })}
        </OptionGroup>
        <Table />

        {/* Buttons */}
        <div className='flex justify-end mb-3'>
          <Button classNames='bg-cyan-600 hover:bg-cyan-700 text-white'>
            Submit
          </Button>
          <Button classNames='bg-sky-100 hover:bg-sky-200 text-blue-600'>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ExampleForm;
