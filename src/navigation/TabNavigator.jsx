import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Favourites from '../screens/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';
import Materials from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1f2139', // Dark background for the tab bar
          borderTopWidth: 0, // Remove border
          borderRadius: 20,
          position: 'absolute', // Float the tab bar
          marginHorizontal: 16, // Add horizontal margin
          marginBottom: 16, // Add bottom margin
          height: 60, // Increase height for better appearance
          shadowOpacity: 0.0,
          elevation:0,
          paddingTop:2
     
        },
        tabBarActiveTintColor: 'white', // Active tab icon and text color
        tabBarInactiveTintColor: 'gray', // Inactive tab icon and text color
        tabBarLabelStyle: {
          fontSize: 10, // Customize font size for labels
          fontFamily: 'customhallMedium', // Optional: Use a custom font
        },
        tabBarIconStyle: {
          size: 18, // Adjust icon size
        },
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
      }}>
      <Tab.Screen name="Playlist" component={HomeScreen} 
        options={{
         
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="Favourites" component={Favourites} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <Materials name="favorite" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
};

export default StackNavigator;
