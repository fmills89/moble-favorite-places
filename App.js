import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import PlaceDetails from './screens/PlaceDetails';
import IconButton from './components/ui/IconButton';
import Map from './screens/Map';

import { Colors } from './constants/colors';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  // using state while db func init is running
  // setting to false until init is done then set to true
  // showing app loading screen
  const [dbInitialized, setDbInitialized] = useState(false);

  // when app function is evaluated for the first time
  // so is the db - using useEffect w/ empty dependecies array
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a New Place',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
