import { Audio } from 'expo-av';

// Define sound file paths
const SOUND_FILES = {
  // Placement sounds
  PLACEMENT_START: require('../assets/sounds/placement-start.mp3'),
  PLACEMENT_CONFIRM: require('../assets/sounds/placement-confirm.mp3'),
  
  // Overwrite sounds
  OVERWRITE_START: require('../assets/sounds/overwrite-start.mp3'),
  OVERWRITE_CONFIRM: require('../assets/sounds/overwrite-confirm.mp3'),
  
  // Earnings sounds
  EARNING_RECEIVED: require('../assets/sounds/earning-received.mp3'),
  FIRST_EARNING: require('../assets/sounds/first-earning.mp3'),
  
  // UI interaction sounds
  BUTTON_TAP: require('../assets/sounds/button-tap.mp3'),
  SWIPE: require('../assets/sounds/swipe.mp3'),
  ALERT: require('../assets/sounds/alert.mp3'),
};

// Sound categories
export enum SoundCategory {
  PLACEMENT = 'placement',
  OVERWRITE = 'overwrite',
  EARNINGS = 'earnings',
  UI = 'ui',
}

// Cache for loaded sounds
const soundCache: { [key: string]: Audio.Sound } = {};

// Volume settings for each category
let categoryVolumes: { [key in SoundCategory]: number } = {
  [SoundCategory.PLACEMENT]: 1.0,
  [SoundCategory.OVERWRITE]: 1.0,
  [SoundCategory.EARNINGS]: 1.0,
  [SoundCategory.UI]: 0.5,
};

// Master volume
let masterVolume = 1.0;
let soundEnabled = true;

/**
 * Initialize the sound system
 */
export const initSounds = async (): Promise<void> => {
  try {
    // Load all sounds in the background
    Object.entries(SOUND_FILES).forEach(async ([key, source]) => {
      try {
        const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: false });
        soundCache[key] = sound;
      } catch (error) {
        console.warn(`Failed to preload sound ${key}:`, error);
      }
    });
    
    // Configure Audio mode
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  } catch (error) {
    console.error('Failed to initialize sounds:', error);
  }
};

/**
 * Set the master volume
 * @param volume Value between 0 and 1
 */
export const setMasterVolume = (volume: number): void => {
  masterVolume = Math.max(0, Math.min(1, volume));
};

/**
 * Set volume for a specific category
 * @param category The sound category
 * @param volume Value between 0 and 1
 */
export const setCategoryVolume = (category: SoundCategory, volume: number): void => {
  categoryVolumes[category] = Math.max(0, Math.min(1, volume));
};

/**
 * Enable or disable all sounds
 * @param enabled Whether sounds should be enabled
 */
export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
};

/**
 * Play a sound effect
 * @param soundName Name of the sound to play
 * @param category Category the sound belongs to
 */
export const playSound = async (
  soundName: keyof typeof SOUND_FILES,
  category: SoundCategory
): Promise<void> => {
  if (!soundEnabled) return;
  
  try {
    const effectiveVolume = masterVolume * categoryVolumes[category];
    if (effectiveVolume <= 0) return;
    
    let sound = soundCache[soundName];
    
    if (!sound) {
      // Load sound if not already loaded
      const { sound: newSound } = await Audio.Sound.createAsync(
        SOUND_FILES[soundName],
        { volume: effectiveVolume }
      );
      sound = newSound;
      soundCache[soundName] = sound;
    } else {
      // Reset sound position and set volume
      await sound.setPositionAsync(0);
      await sound.setVolumeAsync(effectiveVolume);
    }
    
    await sound.playAsync();
  } catch (error) {
    console.warn(`Failed to play sound ${soundName}:`, error);
  }
};

/**
 * Clean up all sound resources
 */
export const unloadSounds = async (): Promise<void> => {
  try {
    // Unload all cached sounds
    await Promise.all(
      Object.values(soundCache).map(sound => sound.unloadAsync())
    );
  } catch (error) {
    console.error('Failed to unload sounds:', error);
  }
}; 