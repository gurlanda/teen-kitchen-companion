import React, { useEffect, useState, useRef } from 'react';
import { useImperativeHandle } from 'react';
import createId from '../../../utils/createId';
import MultImageChoiceInput from './MultImageChoiceInput';

const BlueRandomBlock = ({ blue }) => {
  return (
    <div
      className={`border-gray-700 h-96 min-w-[25%] flex flex-col justify-center items-center ${blue} snap-center snap-always`}
    >
      <span className='block text-white text-xl font-bold  text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        voluptatum sequi veritatis sed, ipsam earum?
      </span>
    </div>
  );
};

const PaddingBlock = () => {
  return <div className='min-h-full min-w-[50%] bg-red-800 block'> </div>;
};

const TargetBlock = React.forwardRef(({ triggered }, ref) => {
  return (
    <div
      className={`min-h-full min-w-[50%] snap-center snap-always block ${
        triggered ? 'bg-green-400' : 'bg-orange-400'
      }`}
      ref={ref}
    />
  );
});

let ScrollContainer = ({ scrollPos, isTriggered }, ref) => {
  const scrollContainer = useRef();
  const targetElement = useRef();

  useImperativeHandle(ref, () => ({
    get scrollContainer() {
      return scrollContainer.current;
    },
    get targetElement() {
      return targetElement.current;
    },
  }));

  useEffect(() => {
    if (!scrollContainer.current) {
      console.log('scrollContainer.current not bound');
      return;
    }

    scrollContainer.current.scrollTo({
      top: 0,
      left: scrollPos,
      behavior: 'instant',
    });
  }, []);

  return (
    <div
      className='relative flex space-x-4 w-1/2 overflow-x-auto mx-auto snap-x'
      ref={scrollContainer}
    >
      <PaddingBlock />
      {range(10).map(() => (
        <BlueRandomBlock blue={'bg-blue-500'} key={createId()} />
      ))}
      <TargetBlock triggered={isTriggered} ref={targetElement} />
      {range(10).map(() => (
        <BlueRandomBlock blue={'bg-blue-500'} key={createId()} />
      ))}
      <PaddingBlock />
    </div>
  );
};
ScrollContainer = React.forwardRef(ScrollContainer);

const FoodJournal = () => {
  const scrollRef = useRef();
  const [scrollPos, setScrollPos] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const isInTotalView = () => {
      if (!scrollRef.scrollContainer || !scrollRef.targetElement) {
        return false;
      }

      const scLeft = scrollRef.scrollContainer.scrollLeft;
      const scRight = scLeft + scrollRef.scrollContainer.clientWidth;

      const targetLeft = scrollRef.targetElement.offsetLeft;
      const targetRight = targetLeft + scrollRef.targetElement.clientWidth;

      const isTotal = targetLeft >= scLeft && targetRight <= scRight;

      if (isTotal) {
        setScrollPos(scrollRef.scrollContainer.scrollX);
        console.log('triggered!');
      }

      return isTotal;
    };

    const scrollListener = (e) => {
      setIsTriggered(isInTotalView());
    };

    if (scrollRef.scrollContainer) {
      scrollRef.scrollContainer.addEventListener('scroll', scrollListener);
    }

    return () => {
      scrollRef.scrollContainer.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const onFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='flex flex-col items-center justify-evenly min-h-full min-w-full'>
      <ScrollContainer
        ref={scrollRef}
        scrollPos={scrollPos}
        isTriggered={isTriggered}
      />

      <MultImageChoiceInput />
    </div>
  );
};

const randomBlue = () => {
  const rand = Math.floor(Math.random() * 8);
  switch (rand) {
    // case 0:
    //   return 'bg-blue-50';
    // case 1:
    //   return 'bg-blue-100';
    case 0:
      return 'bg-blue-200';
    case 1:
      return 'bg-blue-300';
    case 2:
      return 'bg-blue-400';
    case 3:
      return 'bg-blue-500';
    case 4:
      return 'bg-blue-600';
    case 5:
      return 'bg-blue-700';
    case 6:
      return 'bg-blue-800';
    case 7:
      return 'bg-blue-900';
    default:
      return 'bg-blue-600';
  }
};

const range = (n) => {
  return [...Array(n).keys()];
};

export default FoodJournal;
