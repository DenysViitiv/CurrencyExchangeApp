import AsyncStorage from '@react-native-async-storage/async-storage';
import {z} from 'zod';
import {LAST_INFO_DATA_KEY} from '../constants/asyncStorageKeys';
import {requestLatestDataSchema} from '../zod/schemas';

export const setLastDataAsync = async (
  lastData: z.infer<typeof requestLatestDataSchema>,
) => {
  try {
    await AsyncStorage.setItem(LAST_INFO_DATA_KEY, JSON.stringify(lastData));
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getLastDataAsync = async (): Promise<z.infer<
  typeof requestLatestDataSchema
> | null> => {
  try {
    const data = await AsyncStorage.getItem(LAST_INFO_DATA_KEY);

    if (data) {
      return await JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const removeLastDataAsync = async () => {
  try {
    await AsyncStorage.removeItem(LAST_INFO_DATA_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
