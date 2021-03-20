import React, { FunctionComponent } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading: FunctionComponent = props => {
  const { children } = props;

  return (
    <div className="flex flex-row items-center">
      <FaSpinner className="animate-spin" data-testid="loadingIcon" />
      {children && <div className="ml-2">{children}</div>}
    </div>
  );
};

export default Loading;
