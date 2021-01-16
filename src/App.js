import { Header, List, Segment } from 'semantic-ui-react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.scss';

const queryClient = new QueryClient();

const App = () => {
  const slug = 'create-reach-inspire';

  return (
    <QueryClientProvider client={queryClient}>
      <Segment className="App" basic>
        <Header className="App-header">Podcast Player</Header>
        <PodcastContainer slug={slug} />
      </Segment>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const PodcastContainer = ({ slug }) => {
  const { isLoading, error, data } = useQuery('podcastData', () => fetch(`https://public-api.pod.co/podcasts/${slug}`).then((res) => res.json()));

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  console.log(data);

  return (
    <>
      <EpisodeList slug={slug} />
      <PlaybackControls />
      <PlaybackMetadata />
      <PlaybackProgressBar />
    </>
  );
};

export const EpisodeList = ({ slug }) => {
  const { isLoading, error, data } = useQuery('podcastEpisodes', () => fetch(`https://public-api.pod.co/podcasts/${slug}/episodes`).then((res) => res.json()));

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  console.log(data);

  return (
    <List divided relaxed>
      {data.data && data.data.map((episodeData) => (
        <EpisodeLine episodeData={episodeData} />
      ))}
    </List>
  );
};

const EpisodeLine = ({ episodeData }) => {
  const durationMinutes = episodeData.duration / 60000;
  return (
    <List.Item key={episodeData.id}>
      <List.Icon name="play" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>
          {episodeData.title}
          {' - '}
          {durationMinutes.toFixed(0)}
          {' mins'}
        </List.Header>
        <List.Description>
          <div dangerouslySetInnerHTML={{ __html: episodeData.description }} />
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export const PlaybackControls = () => (
  <div>
    PlaybackControls
  </div>
);

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
