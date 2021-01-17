import { useContext } from 'react';
import { Progress } from 'semantic-ui-react';
import millisecondsToMinsAndSecs from '../../utils/millisecondsToMinsAndSecs';
import SelectedEpisodeContext from '../SelectedEpisodeContext';
import { Bar, ProgressWrapper } from './ProgressBarStyles';

export default ({ currentTime, isPlaying }) => {
  const { selectedEpisode } = useContext(SelectedEpisodeContext);

  const handleClick = (e) => {
    const x = e.pageX - e.target.offsetLeft;

    console.log(x);
  };

  return (
    <ProgressWrapper className="progress-details">
      <div>{millisecondsToMinsAndSecs(currentTime * 1000)}</div>
      <Bar>
        <Progress onClick={handleClick} className="progress__bar" size="tiny" active={isPlaying} color="orange" value={currentTime * 1000} total={selectedEpisode.duration} />
      </Bar>
      <div>{millisecondsToMinsAndSecs(selectedEpisode.duration)}</div>
    </ProgressWrapper>
  );
};
