import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import HomeScreenStack from "./TabNavigator";
import MainModel from '../screens/MainModel';

const Stack = createStackNavigator ();


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const RootStack = () => {
 
  return (
    <Stack.Navigator
      initialRouteName="HomeScreenStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1f2139', // Black background for the header
        },
        headerTitleStyle:{
          fontFamily : 'customhallMedium',
          fontSize:15
        },
        headerTintColor: 'white', // White text for the header
        contentStyle: {
          backgroundColor: '#1f2139', // Black background for the screen content
        },
        headerTitleAlign: 'center', // Center the header title
      }}
    >
      <Stack.Group>
        <Stack.Screen 
          name="HomeScreenStack" 
          component={HomeScreenStack} 
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
          name="MusicModel" 
          component={MainModel} 
       
          options={{
            title:"Now Playing",
            gestureEnabled: true,
            gestureDirection : 'vertical',
            transitionSpec: {
              open: config,
              close: config,
            },
            // headerShown : false
          }}
        
        />
      </Stack.Group>
      
    </Stack.Navigator>
  );
};

export default RootStack;
