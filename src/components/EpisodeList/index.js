import { Item } from 'semantic-ui-react';
import EpisodeLine from '../EpisodeLine';

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
