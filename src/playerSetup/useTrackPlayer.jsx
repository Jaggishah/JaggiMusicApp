import { useCallback, useEffect } from "react";
import TrackPlayer, { State } from "react-native-track-player";
import { AppKilledPlaybackBehavior,Capability } from 'react-native-track-player';


const useTrackPlayerhook = () => {
    const setUpTrackPlayer = async () => {
        try {
          await TrackPlayer.setupPlayer();
          await TrackPlayer.updateOptions({
            stopWithApp: true,
            // Media controls capabilities
            capabilities: [Capability.Play, Capability.Pause,Capability.SkipToNext,
              Capability.SkipToPrevious,],
    
            // Capabilities that will show up when the notification is in the compact form on Android
            compactCapabilities: [Capability.Play, Capability.Pause],
            notificationCapabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
            ],
          });
        } catch (err) {
          console.error(`Could not setup track player. ${err}`);
          TrackPlayer.remove();
        }
      };

    const addTracks = async (tracks) => {
        try {
          await TrackPlayer.setQueue(tracks);
        } catch (error) {
          console.error('Error adding tracks:', error);
        }
      };

    const togglePlayback = async () => {
        try {
          const state = await TrackPlayer.getState();
          if (state === State.Playing) {
            await TrackPlayer.pause();
          } else {
            await TrackPlayer.play();
          }
        } catch (error) {
          console.error('Error toggling playback:', error);
        }
      };
    const playSpecific = async () => {
      try {
     
          await TrackPlayer.play();
        
      } catch (error) {
        console.error('Error toggling playback:', error);
      }

     
    }

      const getPlayState = async () => {
        try {
          const state = await TrackPlayer.getState();
          if (state === State.Playing) {
            console.log("playing")
            return true
          } else {
            return false
          }
        } catch (error) {
          console.error('Error toggling playback:', error);
          return false
        }
      };

      const handleNext = async (item) => {
        try {
          await TrackPlayer.load(item);
        } catch (error) {
          console.error('Error toggling playback:', error);
        }

      }

      const handlePrev = async () => {
        try {
          await TrackPlayer.skipToPrevious();
        } catch (error) {
          console.error('Error toggling playback:', error);
        }
      }

      const handleSeekTrack = async (value) => {
        try {
          await TrackPlayer.seekTo(value);
        } catch (error) {
          console.error('Error toggling playback:', error);
        }
        
      }

  return {setUpTrackPlayer,addTracks,togglePlayback,getPlayState,handleNext,handlePrev,playSpecific,handleSeekTrack}
}

export default useTrackPlayerhook
