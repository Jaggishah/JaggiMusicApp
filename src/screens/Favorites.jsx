import {View, Text} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from "../store/storageHandlers"
import useStore from '../store';
import ListData from "../components/FavoriteListItem"
import { useIsFocused } from '@react-navigation/native';
import useTrackPlayerhook from '../playerSetup/useTrackPlayer';
import FloatPlayer from './FloatPlayer';
import TrackPlayer, { useActiveTrack  } from 'react-native-track-player';

const FavoritesScreen = () => {
  const {addTracks} = useTrackPlayerhook();
  const { storeData,setStore } = useStore(state => state)
  const { currentIndex, setCurrentIndex } = useStore(state => state)
  const isFocused = useIsFocused()
  const active = useActiveTrack()
  useEffect(()=>{
      getData("musicapp",setStore)
  },[])

  useEffect(()=>{
    if(storeData.data.data && isFocused ){
      // addTracks(storeData.data.data || [])
      setCurrentIndex(undefined)
    }
  },[isFocused])

  return (
    <View style={{backgroundColor:"#0d1129",flex:1,  alignItems: 'center',
      padding:10,
      justifyContent: 'flex-start'}}>
        <View  style={{
        flex: 1,width:"100%"}}>
          <ListData songsData={storeData.data} local={true} />
      </View>
      {active && (
       <FloatPlayer screen={"fav"}/>
      )}
    </View>
  );
};

export default FavoritesScreen;

