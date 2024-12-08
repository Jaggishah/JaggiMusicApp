import TrackPlayer from 'react-native-track-player';

export const PlaybackService = async function() {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', async () => {
    await TrackPlayer.destroy();
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    await TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener('remote-next', async () => {
    await TrackPlayer.skipToNext();
  });

  
};
