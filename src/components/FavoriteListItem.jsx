import React, { useCallback, useEffect, useMemo } from 'react';
import { Image } from "react-native"
import { FlatList, Text, View, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import useStore from "../store"
import { storeLocalData, removeData } from '../store/storageHandlers';
import TrackPlayer from 'react-native-track-player';


const App = ({songsData,local}) => {
    const {  currentIndex,setStore } = useStore((state) => state);
    const navigation = useNavigation();
  
    const handleModelPlayer = useCallback((item,index) => {
        async function loaderMusic(){
          await TrackPlayer.load({...item,trackIndex:index})
        }
        loaderMusic()
        navigation.navigate('MusicModel',{data:{...item,trackIndex:index},screen : "fav"})
    },[navigation])

    const handleDelete = (item) => {
      removeData("musicapp",item,setStore)
    }


  const renderItem = useCallback(({ item, index}) => (
    <TouchableOpacity  style={ index % 2 ? styles.item : {...styles.item,backgroundColor:'#0d1129'}} onPress={() => handleModelPlayer(item,index)}>
      <View style={styles.title}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.artwork ?? Image.resolveAssetSource(require('../assests/Unknown.jpg')).uri,
            priority: FastImage.priority.high
        }}
        onError={() => console.log("unable to load image")}
        resizeMode={FastImage.resizeMode.stretch}
      />
      </View>
  
        <View style={styles.InsideItem}>
            <View>
                <Text style={styles.titleSong}>{item?.title?.trim() }</Text>
                <Text style={styles.ArtistSong}>{item?.artist?.trim() }</Text>
            </View>
            <View style={{ display:"flex",flexDirection:"row",gap:20}}>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Icon name={"trash-bin-outline"} size={25} color="#fff"/>
                </TouchableOpacity>
                {/* <Icon name={currentIndex === index ? "cellular-outline" : "play-outline"} size={25} color="#fff" /> */}
            </View>
        </View>
    </TouchableOpacity>
  ),[handleModelPlayer,currentIndex,local,storeLocalData.data]);

  const renderFooter = () => {
    if (!songsData.loading || local) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  const EmptyComponent = () =>{
    return <View style={styles.emptyComponent}> 
    <Text style={styles.ArtistSong}>No Data Available yet!</Text>
    </View>
  }
  return (
    <FlatList
      data={ songsData?.data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={[styles.listContainer, !songsData?.data?.length && { flex: 1 }]}
      ListEmptyComponent={<EmptyComponent/>}
      ListFooterComponent={renderFooter} // Show loading spinner at the bottom
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 200,
    
  },
  image: {
    width: 50,
    height: 50,
    borderRadius:10
  },
  item: {
    backgroundColor: '#1f2139',
    padding: 15,
    marginVertical: 8,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    borderRadius: 8,
   
  },
  InsideItem :   {
    flex:0.9,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    paddingRight:16,
    width:100,
    fontSize: 16,
    color: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  loader: {
    marginVertical: 16,
  },
  titleSong:{
    fontFamily : 'customhallMedium',
    color:"#fff",
    fontSize:12,
  },
  ArtistSong:{
    color:'#88899e',
    fontSize:10,
  },
  emptyComponent:{flex:1,color:"#fff",justifyContent:"center",alignItems:"center"}
});

export default App;
