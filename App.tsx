import * as React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RootStack from './src/navigation';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useTrackPlayer from './src/playerSetup/useTrackPlayer';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const {setUpTrackPlayer} = useTrackPlayer();
  let playerInitialized = false;
  React.useEffect(() => {
    if(!playerInitialized){
      playerInitialized = true
      setUpTrackPlayer();
    }
   
    SplashScreen.hide();
  },[])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
