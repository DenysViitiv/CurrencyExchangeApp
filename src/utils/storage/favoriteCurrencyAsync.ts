import AsyncStorage from '@react-native-async-storage/async-storage';
import {z} from 'zod';
import {FAVORITE_CURRENCY_KEY} from '../constants/asyncStorageKeys';
import {favoritesSchemas} from '../zod/schemas';

export const setFavoritesAsync = async (
  lastData: z.infer<typeof favoritesSchemas>[],
) => {
  try {
    await AsyncStorage.setItem(FAVORITE_CURRENCY_KEY, JSON.stringify(lastData));
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getFavoritesAsync = async (): Promise<
  z.infer<typeof favoritesSchemas>[] | null
> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITE_CURRENCY_KEY);
    if (data) {
      return await JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const removeFavoritesAsync = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITE_CURRENCY_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
