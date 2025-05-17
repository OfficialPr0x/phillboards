// Mock implementation for expo-av for web

// Mock Audio class
class Sound {
  static create = () => {};

  constructor() {
    this._isPlaying = false;
    this._volume = 1.0;
    this._position = 0;
    this._duration = 100;
  }

  static createAsync = async (source, initialStatus = {}, onPlaybackStatusUpdate = null) => {
    const sound = new Sound();
    if (onPlaybackStatusUpdate) {
      sound._onPlaybackStatusUpdate = onPlaybackStatusUpdate;
    }
    return { sound };
  };

  async playAsync() {
    this._isPlaying = true;
    if (this._onPlaybackStatusUpdate) {
      this._onPlaybackStatusUpdate({
        isPlaying: this._isPlaying,
        positionMillis: this._position,
        durationMillis: this._duration,
        volume: this._volume,
      });
    }
    return {};
  }

  async pauseAsync() { 
    this._isPlaying = false;
    return {}; 
  }
  
  async stopAsync() { 
    this._isPlaying = false;
    this._position = 0;
    return {}; 
  }

  async unloadAsync() { return {}; }

  async setVolumeAsync(volume) {
    this._volume = volume;
    return {};
  }

  async setPositionAsync(position) {
    this._position = position;
    return {};
  }

  async getStatusAsync() {
    return {
      isPlaying: this._isPlaying,
      positionMillis: this._position,
      durationMillis: this._duration,
      volume: this._volume,
    };
  }
}

// Audio module
const Audio = {
  Sound,
  setAudioModeAsync: async (options) => ({}),
};

export { Audio };
export default { Audio }; 