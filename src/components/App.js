import { Header, Search, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import _ from 'lodash';

import SelectedEpisodeContext from './SelectedEpisodeContext';
import EpisodeList from './EpisodeList';

import './App.scss';
import Player from './Player';
// import AudioContext from './AudioContext';

const App = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(undefined);
  const value = { selectedEpisode, setSelectedEpisode };

  const slug = 'create-reach-inspire';

  const { isLoading, error, data } = useQuery('podcastData', async () => {
    const res = await fetch(`https://public-api.pod.co/podcasts/${slug}`);
    return res.json();
  });

  if (isLoading) return 'Loading podcast...';

  if (error) return `Podcast data fetch failed with an error: ${error.message}`;

  // console.log(data.data);

  return (
    <>
      <Segment className="App" basic>
        <Header size="huge">{data.data.title}</Header>
        <SelectedEpisodeContext.Provider value={value}>
          {/* <AudioContext.Provider value={new Audio()}> */}
          <PodcastContainer slug={slug} />
          {/* </AudioContext.Provider> */}
        </SelectedEpisodeContext.Provider>
      </Segment>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

const PodcastContainer = ({ slug }) => {
  const [sortedEpisodes, setSortedEpisodes] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  const { isLoading, error, data } = useQuery('podcastEpisodes', async () => {
    const res = await fetch(
      `https://public-api.pod.co/podcasts/${slug}/episodes`,
    );
    return res.json();
  });

  useEffect(() => {
    if (data && data.data && data.data.length) {
      const sorted = data.data.sort((episodeA, episodeB) => {
        if (episodeA.published_at < episodeB.published_at) {
          return -1;
        }
        if (episodeA.published_at > episodeB.published_at) {
          return 1;
        }
        return 0;
      });

      setSortedEpisodes(sorted);
    }
  }, [data]);

  if (isLoading) return 'Loading episodes...';

  if (error) {
    return `Podcast episodes fetch failed with an error: ${error.message}`;
  }

  const handleSearchChange = (e, { value }) => {
    setSearchLoading(true);
    setSearchValue(value);

    setTimeout(() => {
      if (value.length < 1) {
        setSearchLoading(false);
        setSearchValue('');
        setResults([]);
        return;
      }
      const re = new RegExp(_.escapeRegExp(searchValue), 'i');
      const isMatch = (result) => re.test(result.title);

      setSearchLoading(false);
      setResults(_.filter(sortedEpisodes, isMatch));
    }, 300);
  };

  return (
    <Segment>
      <Player sortedEpisodes={sortedEpisodes} />
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        onSearchChange={_.debounce(handleSearchChange, 500, {
          leading: true,
        })}
        value={searchValue}
        loading={searchLoading}
        resultRenderer={() => {}}
        showNoResults={false}
      />
      <EpisodeList sortedEpisodes={results.length ? results : sortedEpisodes} />
      <PlaybackMetadata />
      <PlaybackProgressBar />
    </Segment>
  );
};

export const PlaybackMetadata = () => (
  <div>
    PlaybackMetadata
  </div>
);

export const PlaybackProgressBar = () => (
  <div>
    PlaybackProgressBar
  </div>
);

export default App;
