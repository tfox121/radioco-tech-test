import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

import ProgressBar from '../ProgressBar';
import SelectedEpisodeContext from '../SelectedEpisodeContext';
import {
  Controls,
  Mask,
  Metadata, PlayerStyles, Spacer, Text,
} from './PlayerStyles';
import useLocalStorage from '../useLocalStorage';
import PlayOrPauseIcon from '../PlayOrPauseIcon';
import { Media } from '../MediaContext';
import useWindowSize from '../useWindowSize';

export default ({ sortedEpisodes, audioPlayer }) => {
  const { selectedEpisode, setSelectedEpisode } = useContext(
    SelectedEpisodeContext,
  );

  const audio = audioPlayer.current;
  const [currentTime, setCurrentTime] = useState(
    audio ? audio.currentTime : 0,
  );
  const [volume, setVolume] = useState(0.5);
  const [isPaused, setIsPaused] = useState(true);
  const [readyState, setReadyState] = useState(0);

  const [storedEpisode, setStoredEpisode] = useLocalStorage('episode');
  const size = useWindowSize();

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
      let episodeIndex;
      const episode = sortedEpisodes.filter(
        (stored, index) => {
          if (stored.id === storedEpisode) {
            episodeIndex = index;
            return true;
          }
          return false;
        },
      )[0];
      setSelectedEpisode({ index: episodeIndex, ...episode });
    }
  }, [
    selectedEpisode,
    sortedEpisodes,
    storedEpisode,
    setSelectedEpisode,
    setStoredEpisode,
  ]);

  const playPause = () => {
    isPaused
      ? audio.play().catch((err) => {
        console.error(err);
      })
      : audio.pause();
  };

  const skipBackward = () => {
    setReadyState(0);
    let episode;
    if (selectedEpisode.index === 0) {
      episode = selectedEpisode;
    } else {
      episode = {
        index: selectedEpisode.index - 1,
        ...sortedEpisodes[selectedEpisode.index - 1],
      };
    }
    setSelectedEpisode(episode);
    if (!isPaused) {
      audio.play().catch((err) => {
        console.error(err);
      });
    }
  };

  const skipForward = useCallback(async () => {
    setReadyState(0);
    if (selectedEpisode.index === sortedEpisodes.length - 1) {
      return;
    }
    const episode = {
      index: selectedEpisode.index + 1,
      ...sortedEpisodes[selectedEpisode.index + 1],
    };
    setSelectedEpisode(episode);
    if (!isPaused) {
      audio.play().catch((err) => {
        console.error(err);
      });
    }
  }, [
    audio,
    isPaused,
    selectedEpisode,
    setSelectedEpisode,
    sortedEpisodes,
  ]);

  useEffect(() => {
    if (audio) {
      setReadyState(audio.readyState);
    }
  }, [audio, selectedEpisode]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  useEffect(() => {
    const eventListener = () => setReadyState(2);
    const pauseEventListener = () => setIsPaused(true);
    const playEventListener = () => setIsPaused(false);
    const timeUpdateEventListener = () => setCurrentTime(audio.currentTime);

    if (audio) {
      audio.addEventListener('canplay', eventListener);
      audio.addEventListener('pause', pauseEventListener);
      audio.addEventListener('play', playEventListener);
      audio.addEventListener('timeupdate', timeUpdateEventListener);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('canplay', eventListener);
        audio.removeEventListener('pause', pauseEventListener);
        audio.removeEventListener('play', playEventListener);
        audio.removeEventListener('timeupdate', timeUpdateEventListener);
      }
    };
  }, [audio]);

  useEffect(() => {
    const endedEventListener = async () => {
      await skipForward();
      audio.play().catch((err) => {
        console.error(err);
      });
    };
    if (audio) {
      audio.addEventListener('ended', endedEventListener);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', endedEventListener);
      }
    };
  }, [audio, skipForward]);

  // useEffect(() => {
  //   if (selectedEpisode) {
  //     console.log(selectedEpisode);
  //     audio.setAttribute('src', selectedEpisode.url);
  //     audio.play();
  //   }
  // }, [selectedEpisode]);

  // useEffect(() => {
  //   if (audio) {
  //     audio.paused ? audio.play() : audio.pause();
  //   }
  // }, [audio]);

  if (!selectedEpisode || !audio) {
    return null;
  }

  const settings = {
    start: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    onChange: (value) => {
      setVolume(value);
    },
  };

  return (
    <PlayerStyles>
      <Segment
        className="wrapper"
        basic
        inverted
        textAlign="left"
        style={size.width < 768 ? {
          background: `url(${selectedEpisode.artwork.urls[1].url}) center/cover`,
        } : {}}
      >
        <Mask />
        <Metadata>
          <Media greaterThan="mobile">
            <Image src={selectedEpisode.artwork.urls[1].url} />
          </Media>
          <Text>
            <Segment basic inverted>
              <div>
                <Header size="large" className="now-playing__name">
                  {selectedEpisode.title}
                </Header>
                <Header size="tiny" className="now-playing__artist">
                  {selectedEpisode.author}
                </Header>
                <div
                  inverted
                  dangerouslySetInnerHTML={{
                    __html: selectedEpisode.description,
                  }}
                />
              </div>
            </Segment>
            <Spacer />
            <Controls>
              <Icon name="step backward" size="large" onClick={skipBackward} />
              <PlayOrPauseIcon
                paused={isPaused}
                handleClick={playPause}
                size="huge"
              />
              <Icon name="step forward" size="large" onClick={skipForward} />
            </Controls>
            <ProgressBar
              currentTime={currentTime}
              readyState={readyState}
            />
            <Slider
              inverted
              value={volume}
              color="orange"
              settings={settings}
            />
          </Text>
        </Metadata>
      </Segment>
    </PlayerStyles>
  );
};
