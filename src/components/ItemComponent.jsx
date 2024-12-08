import React, { useCallback, useEffect, useMemo } from 'react';
import { Image } from "react-native"
import { FlatList, Text, View, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';


const renderItem = ({ item, index}) => (

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
                <Text style={styles.titleSong}>{item.title.trim() }</Text>
                <Text style={styles.ArtistSong}>{item.artist.trim() }</Text>
            </View>
            <View>
                <Icon name="play-outline" size={25} color="#fff" />
            </View>
        </View>
    </TouchableOpacity>
  );

export default memoizedValue = useMemo(() => renderItem, []);