import {View, Text, Button, StyleSheet,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ListData from "../components/ListData"
import useStore from "../store"
import { usePlaybackState, State, useProgress, useActiveTrack  } from 'react-native-track-player';
import useTrackPlayer from '../playerSetup/useTrackPlayer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCallback, useEffect } from "react";
import FastImage from 'react-native-fast-image';

import { useNavigation } from '@react-navigation/native';
import { Screen } from 'react-native-screens';

const FloatPlayer = ({screen}) => {
    const navigation = useNavigation();
    const {togglePlayback} = useTrackPlayer();

  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;
  const active = useActiveTrack()

  const handleModelPlayer = () => {
    // const index = songsData.data.findIndex(item => item.id === active.id)
    navigation.navigate('MusicModel',{screen})
  }
  return (
    <TouchableOpacity
    onPress={handleModelPlayer}
    style={styles.container}>
    <View style={styles.strip}>
       <FastImage
          style={styles.image}
          source={{
            uri: active?.artwork ?? Image.resolveAssetSource(require('../assests/Unknown.jpg')).uri,
              priority: FastImage.priority.high
          }}
          onError={() => console.log("unable to load image")}
          resizeMode={FastImage.resizeMode.stretch}
        />
      <View>
        <Text style={styles.titleSong}> {active?.title?.trim() ?? "Unknown Title" } </Text>
        <Text style={styles.ArtistSong}>{active?.artist?.trim() ?? "Unknown Artist"}</Text>
      </View>
    </View>

    <TouchableOpacity onPress={togglePlayback}>
            {isPlaying ? 
              <Icon name="pause-circle-outline" size={35} color="#fff" /> : 
              <Icon name="play-circle-outline" size={35} color="#fff" />
            }
      </TouchableOpacity>
   
  </TouchableOpacity>
  )
}

export default FloatPlayer


const styles = StyleSheet.create({
    container :{
              position: 'absolute',
              bottom: 90,
              backgroundColor: '#1B1833',
              width: '95%',
              paddingHorizontal:10,
              paddingVertical:10,
              borderWidth:1,
              borderColor:'grey',
              display:"flex",
              flexDirection : "row",
              justifyContent:"space-between",
              alignItems:"center",
              borderRadius:10
             
            },
    image: {
      width: 40,
      height: 40,
      borderRadius:10
    },
    titleSong:{
      fontFamily : 'customhallMedium',
      color:"#fff",
      fontSize:10,
    },
    ArtistSong:{
      color:'#88899e',
      fontSize:10,
      paddingLeft:2
    },
    strip:{
      display:'flex',
      flexDirection:'row',
      gap:10
    }
  })