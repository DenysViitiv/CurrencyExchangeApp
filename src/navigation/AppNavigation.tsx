import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {LeftArrow} from '../../assets/svg/LeftArrow';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {RootStackParamList} from '../types/navigation';
import {colors} from '../utils/constants/colors';
import styles from './styles';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,

          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'left',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: 'Exchange Rates',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={styles.favoritesButton}>
                <Text style={styles.favoriteText}>Favorites</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={({navigation}) => ({
            title: 'Favorites',
            headerBackButtonDisplayMode: 'minimal',
            headerTitleAlign: 'center',
            headerLeft: ({canGoBack}) =>
              canGoBack && (
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}>
                  <LeftArrow />
                </TouchableOpacity>
              ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
