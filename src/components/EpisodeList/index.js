import { useContext, useState } from 'react';
import { Item } from 'semantic-ui-react';
import timeAgo from '../../utils/timeAgo';
import PlayOrPauseIcon from '../PlayOrPauseIcon';

import SelectedEpisodeContext from '../SelectedEpisodeContext';

const EpisodeLine = ({ episodeData, index, audioPlayer }) => {
  const { selectedEpisode, setSelectedEpisode } = useContext(SelectedEpisodeContext);
  const [isPaused, setIsPaused] = useState(true);

  const episodeSelectedAndPlaying = selectedEpisode
  && selectedEpisode.id === episodeData.id && !isPaused;

  const handleClick = () => {
    if (episodeSelectedAndPlaying) {
      audioPlayer.current.pause();
      return;
    }
    setSelectedEpisode({ index, ...episodeData });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const durationMinutes = episodeData.duration / 60000;

  audioPlayer.current.addEventListener('pause', () => {
    setIsPaused(true);
  });

  audioPlayer.current.addEventListener('play', () => {
    setIsPaused(false);
  });

  return (
    <Item>
      <Item.Image size="tiny" src={episodeData.artwork.urls[0].url} />
      <Item.Content>
        <Item.Header>{episodeData.title}</Item.Header>
        {/* <Item.Meta></Item.Meta> */}
        <Item.Description>
          <div dangerouslySetInnerHTML={{ __html: episodeData.description }} />
        </Item.Description>
        <Item.Extra>
          <PlayOrPauseIcon paused={!episodeSelectedAndPlaying} handleClick={handleClick} size="big" />
          {durationMinutes.toFixed(0)}
          {' mins · '}
          {timeAgo.format(Date.parse(episodeData.published_at))}
          {episodeSelectedAndPlaying && episodeSelectedAndPlaying.toString()}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ({ sortedEpisodes, audioPlayer }) => (
  <Item.Group divided>
    {sortedEpisodes
      && sortedEpisodes.map((episodeData, index) => (
        <EpisodeLine
          episodeData={episodeData}
          audioPlayer={audioPlayer}
          index={index}
          key={episodeData.id}
        />
      ))}
  </Item.Group>
);
