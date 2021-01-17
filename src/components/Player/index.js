import { useContext, useEffect, useState } from 'react';
import {
  Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import UseAudio from '../UseAudio';

import ProgressBar from '../ProgressBar';
import SelectedEpisodeContext from '../SelectedEpisodeContext';
import {
  Metadata, PlaybackControlsStyles, Spacer, Text,
} from './PlayerStyles';
import useLocalStorage from '../useLocalStorage';

export default ({ sortedEpisodes }) => {
  const { selectedEpisode, setSelectedEpisode } = useContext(SelectedEpisodeContext);

  const audio = UseAudio().current;
  const [currentTime, setCurrentTime] = useState(audio ? audio.currentTime : 0);

  const [storedEpisode, setStoredEpisode] = useLocalStorage('episode');

  useEffect(() => {
    if (selectedEpisode) {
      setStoredEpisode(selectedEpisode.id);
    }

    if (
      !selectedEpisode
      && storedEpisode
      && sortedEpisodes
      && sortedEpisodes.length
    ) {
      const episode = sortedEpisodes.filter((stored) => stored.id === storedEpisode)[0];
      setSelectedEpisode(episode);
    }
  }, [selectedEpisode, sortedEpisodes, storedEpisode, setSelectedEpisode, setStoredEpisode]);

  const playPause = () => {
    console.log(audio.paused ? 'PLAY' : 'PAUSED');
    audio.paused ? audio.play() : audio.pause();
  };

  useEffect(() => {
    if (selectedEpisode) {
      console.log(selectedEpisode);
      audio.setAttribute('src', selectedEpisode.url);
      audio.play();
    }
  }, [selectedEpisode]);

  useEffect(() => {
    if (audio) {
      audio.paused ? audio.play() : audio.pause();
    }
  }, [audio]);

  if (!selectedEpisode || !audio) {
    return null;
  }

  const skipBackward = () => {
    if (selectedEpisode.index === 0) {
      setSelectedEpisode(selectedEpisode);
      return;
    }
    setSelectedEpisode({
      index: selectedEpisode.index - 1,
      ...sortedEpisodes[selectedEpisode.index - 1],
    });
  };

  const skipForward = () => {
    if (selectedEpisode.index === sortedEpisodes.length - 1) {
      return;
    }
    setSelectedEpisode({
      index: selectedEpisode.index + 1,
      ...sortedEpisodes[selectedEpisode.index + 1],
    });
  };

  const playOrPauseIcon = (playing) => {
    if (playing === true) {
      return (
        <Icon name="pause circle outline" size="big" onClick={playPause} />
      );
    }
    return <Icon name="play circle outline" size="big" onClick={playPause} />;
  };

  audio.addEventListener('timeupdate', () => {
    setCurrentTime(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    skipForward();
  });

  return (
    <Segment basic inverted textAlign="center" className="App">
      <PlaybackControlsStyles>
        <Metadata className="now-playing__side">
          <Image src={selectedEpisode.artwork.urls[1].url} />
          <Text>
            <Header size="large" className="now-playing__name">
              {selectedEpisode.title}
            </Header>
            <Header className="now-playing__artist">
              {selectedEpisode.author}
            </Header>
            <Segment
              inverted
              dangerouslySetInnerHTML={{ __html: selectedEpisode.description }}
            />
            <Spacer />
            <div className="controls">
              <Icon name="step backward" size="large" onClick={skipBackward} />
              {playOrPauseIcon(!audio.paused)}
              <Icon name="step forward" size="large" onClick={skipForward} />
            </div>
            <ProgressBar currentTime={currentTime} isPlaying={!audio.paused} />
          </Text>
        </Metadata>
      </PlaybackControlsStyles>
    </Segment>
  );
};
