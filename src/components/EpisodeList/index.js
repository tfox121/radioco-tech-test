import { useContext } from 'react';
import { Icon, Item } from 'semantic-ui-react';
import timeAgo from '../../utils/timeAgo';

import SelectedEpisodeContext from '../SelectedEpisodeContext';

const EpisodeLine = ({ episodeData, index }) => {
  const { setSelectedEpisode } = useContext(SelectedEpisodeContext);
  // const episodeSelected = selectedEpisode && selectedEpisode.id === episodeData.id;

  // console.log(episodeSelected);

  const durationMinutes = episodeData.duration / 60000;

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
          <Icon
            name="play circle"
            size="big"
            onClick={() => setSelectedEpisode({ index, ...episodeData })}
          />
          {durationMinutes.toFixed(0)}
          {' mins · '}
          {timeAgo.format(Date.parse(episodeData.published_at))}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ({ sortedEpisodes }) => (
  <Item.Group divided>
    {sortedEpisodes
        && sortedEpisodes.map((episodeData, index) => (
          <EpisodeLine episodeData={episodeData} index={index} key={episodeData.id} />
        ))}
  </Item.Group>
);
