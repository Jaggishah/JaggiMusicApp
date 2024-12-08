import {View, Text, Button, StyleSheet,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ListData from "../components/ListData"
import useStore from "../store"
import { useActiveTrack  } from 'react-native-track-player';
import useTrackPlayer from '../playerSetup/useTrackPlayer';
import {  useEffect } from "react";
import FloatPlayer from './FloatPlayer';
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = () => {
  const isFocused = useIsFocused();
  const {addTracks} = useTrackPlayer();
  const songsData = useStore((state) => state.songs);
  const fetchSongs = useStore((state) => state.fetchSingleSongs);
  const { currentIndex, setCurrentIndex } = useStore(state => state)
  const active = useActiveTrack()
  

  useEffect(() => {
     
    if(isFocused && !active && songsData.data.length ){
      // addTracks(songsData.data || [])
      setCurrentIndex(undefined)
    }

    else if(isFocused && !active){
      setCurrentIndex(undefined)
    }

  },[isFocused])

  useEffect(() => {
    fetchSongs();
  },[])


  // useEffect(() => {
  //     addTracks(songsData.data || [])
  //  },[songsData])




  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#0d1129',
        padding:10
      }}>
      <Text style={{color: '#fff',fontSize: 10,letterSpacing:2, color:'#fff',paddingBottom:20,paddingTop:8}}>New single tracks</Text>
      <View  style={{
        flex: 1,width:"100%"}}>
        <ListData songsData={songsData} local={false} addTracks={addTracks}/>
      </View>
      
      {active && (
       <FloatPlayer screen={"main"}/>
      )}
    </View>
  );
};

export default HomeScreen;
