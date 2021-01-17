import { useContext, useEffect, useState } from 'react';
import {
  Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

// import UseAudio from '../UseAudio';
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

export default ({ sortedEpisodes, audioPlayer }) => {
  const { selectedEpisode, setSelectedEpisode } = useContext(
    SelectedEpisodeContext,
  );

  // const audio = UseAudio().current;
  const audio = audioPlayer.current;
  const [currentTime, setCurrentTime] = useState(
    audio ? audio.currentTime : 0,
  );
  const [volume, setVolume] = useState(0.5);
  const [isPaused, setIsPaused] = useState(true);
  const [readyState, setReadyState] = useState(0);

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

  useEffect(() => {
    if (audio) {
      setReadyState(audio.readyState);
    }
  }, [audio]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (selectedEpisode) {
      console.log(selectedEpisode);
      audio.setAttribute('src', selectedEpisode.url);
      audio.play();
    }
  }, [selectedEpisode]);

  // useEffect(() => {
  //   if (audio) {
  //     audio.paused ? audio.play() : audio.pause();
  //   }
  // }, [audio]);

  if (!selectedEpisode || !audio) {
    return null;
  }

  const playPause = () => {
    isPaused ? audio.play() : audio.pause();
  };

  const skipBackward = () => {
    setReadyState(0);
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
    setReadyState(0);
    if (selectedEpisode.index === sortedEpisodes.length - 1) {
      return;
    }
    setSelectedEpisode({
      index: selectedEpisode.index + 1,
      ...sortedEpisodes[selectedEpisode.index + 1],
    });
  };

  const settings = {
    start: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    onChange: (value) => {
      setVolume(value);
    },
  };

  audio.addEventListener('canplay', () => {
    setReadyState(2);
  });

  audio.addEventListener('pause', () => {
    setIsPaused(true);
  });

  audio.addEventListener('play', () => {
    setIsPaused(false);
  });

  audio.addEventListener('timeupdate', () => {
    setCurrentTime(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    skipForward();
  });

  return (
    <PlayerStyles>
      <Segment
        basic
        inverted
        textAlign="left"
        style={{
          background: `url(${selectedEpisode.artwork.urls[1].url}) center/cover`,
        }}
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
              isPlaying={!audio.paused}
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
