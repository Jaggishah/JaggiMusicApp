import { View, Text,StyleSheet,Image } from 'react-native'
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import useTrackPlayerhook from '../playerSetup/useTrackPlayer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePlaybackState, State, useProgress, useActiveTrack  } from 'react-native-track-player';
import { formatTime } from "../playerSetup/helpers.js"
import  useStore from "../store"
import { storeLocalData } from "../store/storageHandlers.js"

const MainModel = ({route}) => {
  const { data, screen } = route.params || {};
  const { togglePlayback,handleNext,handlePrev,playSpecific,handleSeekTrack } = useTrackPlayerhook();
  const playerState = usePlaybackState();
  const { position, buffered, duration } = useProgress()
  const isPlaying = playerState.state === State.Playing;
  const active = useActiveTrack()
  const { sliderValue, setSliderValue, currentIndex, setCurrentIndex, setStore, songs, storeData} = useStore(state => state)
  
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    console.log(data?.trackIndex)
    if(data?.trackIndex !== undefined && data?.trackIndex !== currentIndex){
      playSpecific()
      setSliderValue(0)
      setCurrentIndex(data?.trackIndex)
    }
    
  
  },[])

  useEffect(() => {
    if (!isSeeking) {
      setSliderValue(position);
    }
  }, [position, isSeeking]);

  // Handle seeking to a specific position
  const handleSeek = async (value) => {
    handleSeekTrack(value)
    setSliderValue(position);
    setIsSeeking(false);
  };

  const handleNextLocal = async () => {
    console.log(screen,currentIndex)
    if( songs.data && currentIndex !== songs.data.length - 1 && screen == "main"){
      handleNext(songs.data[currentIndex + 1])
      setCurrentIndex(currentIndex + 1)
    }else if(storeData?.data?.data && currentIndex !== storeData.data?.data?.length - 1 ){
      handleNext(storeData.data?.data?.[currentIndex + 1])
      setCurrentIndex(currentIndex + 1)
    }else{
      setSliderValue(0)
      handleSeekTrack(0)
    }
  }

  const handlePrevLocal = async () => {
    if( songs.data && currentIndex != 0 && screen == "main"){
      handleNext(songs.data[currentIndex - 1])
      setCurrentIndex(currentIndex - 1)
    }else if(storeData?.data?.data && currentIndex !== 0 ){
      handleNext(storeData.data?.data?.[currentIndex - 1])
      setCurrentIndex(currentIndex - 1)
    }else{
      setSliderValue(0)
      handleSeekTrack(0)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: active?.artwork ?? Image.resolveAssetSource(require('../assests/Unknown.jpg')).uri,
              priority: FastImage.priority.high
          }}
          onError={() => console.log("eror1")}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
      <View style={styles.aboutContainer}>
                <Text style={styles.titleSong}>{active?.title?.trim() ?? "Unknown Title" }</Text>
                <Text style={styles.ArtistSong}>{active?.artist?.trim() ?? "Unknown Artist"}</Text>
      </View>
      <View style={styles.actionContainer}>
                <View style={styles.favContainer}>
                <TouchableOpacity onPress={() => storeLocalData("musicapp",active,setStore)}>
                  {screen !== "fav" && <Icon name="heart-outline" size={35} color="#fff" />}
                  </TouchableOpacity>
                </View>
                <View style={styles.sliderContainer}>
                <Slider
                      style={{width: '100%', height: 30, transform: [{ scaleY: 1.2 }]}}
                      value={position}
                      minimumValue={0}
                      maximumValue={duration}
                      minimumTrackTintColor="red"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="red"
                      onValueChange={(value) => {
                        setSliderValue(value);
                        setIsSeeking(true);
                      }}
                      onSlidingComplete={handleSeek}
                    />
                </View>
                <View style={styles.trackContianer}>
                  <Text style={styles.trackinfoText}>{formatTime(position)}</Text>
                  <Text style={styles.trackinfoText}>{formatTime(duration) }</Text>
                </View>
                
                <View style={styles.playContainer}>
                <TouchableOpacity onPress={handlePrevLocal}>
                  <Icon name="arrow-back-circle-outline" size={45} color="#fff" />
                </TouchableOpacity>

                  <TouchableOpacity onPress={togglePlayback}>
                  {isPlaying ? 
                    <Icon name="pause-circle-outline" size={65} color="#fff" /> : 
                    <Icon name="play-circle-outline" size={65} color="#fff" />
                  }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleNextLocal}>
                    <Icon name="arrow-forward-circle-outline" size={45} color="#fff" />
                  </TouchableOpacity>
                </View>
      </View>
    </View>
  )
}

export default MainModel

const styles = StyleSheet.create({
  container :{
    backgroundColor :"#0c112b",
    flex:1,
    flexDirection:"column",
    justifyContent:'flex-start',
    alignItems:'center',
    paddingTop:50,
    gap:10
  },
  imageContainer:{
   
    width:'80%',
    borderRadius:10,
    borderWidth:1,
    flex:0.9
  },
  image:{
    height:'100%',
    width:'100%',
    borderRadius:10
  },
  titleSong:{
    fontFamily : 'customhallMedium',
    color:"#fff",
    fontSize:20,
  },
  ArtistSong:{
    color:'#88899e',
    fontSize:15,
  },
  aboutContainer:{
    paddingVertical:20,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  actionContainer:{
    paddingVertical:20,
    paddingHorizontal:20,
    backgroundColor:"#1f2139",
    width:'100%',
    gap:10
  },
  favContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  playContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:30,
    paddingTop:10

  },
  sliderContainer:{
    width:'100%'
  },

  trackContianer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  trackinfoText:{
    fontSize:12,
    color:"#fff",
    paddingHorizontal:5
  }
})