import { createEvent } from 'effector';
import Hls, { ErrorData, Level, LevelSwitchedData, ManifestParsedData } from 'hls.js';

const setHlsInstance = createEvent<Hls | null>();
const setVideoElement = createEvent<HTMLVideoElement | null>();
const setIsPlayerReady = createEvent<boolean>();

const destroyHls = createEvent<void>();

const setCurrentTime = createEvent<number>();
const setDuration = createEvent<number>();

const setLevels = createEvent<Level[]>();
const setCurrentLevel = createEvent<number>();

const setIsPlaying = createEvent<boolean>();

const manifestParsed = createEvent<ManifestParsedData>();
const levelSwitched = createEvent<LevelSwitchedData>();

const hlsError = createEvent<ErrorData>();

export {
  setHlsInstance,
  levelSwitched,
  hlsError,
  setIsPlaying,
  setVideoElement,
  setIsPlayerReady,
  destroyHls,
  setCurrentLevel,
  setCurrentTime,
  setLevels,
  setDuration,
  manifestParsed,
};
