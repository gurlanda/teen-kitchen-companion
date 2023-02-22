import { FC } from 'react';

const Loading: FC<{}> = () => {
  return (
    <div className="columns m-3">
      <div className="column">
        <h1 className="title">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
