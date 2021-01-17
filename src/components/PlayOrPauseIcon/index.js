import { Icon } from 'semantic-ui-react';

export default ({ paused, handleClick, size }) => {
  if (!paused) {
    return (
      <Icon name="pause circle outline" size={size} onClick={handleClick} />
    );
  }
  return <Icon name="play circle outline" size={size} onClick={handleClick} />;
};
