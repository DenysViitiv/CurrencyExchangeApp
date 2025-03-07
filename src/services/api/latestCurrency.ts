import {FIXER_API_KEY} from '@env';
import {Alert} from 'react-native';
import {z} from 'zod';
import {ResponseErrorType} from '../../types/request';
import {requestLatestDataSchema} from '../../utils/zod/schemas';

export async function getLatesRatesByBase(
  base: string,
): Promise<z.infer<typeof requestLatestDataSchema> | ResponseErrorType> {
  try {
    const response = await fetch(
      `https://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}&base=${base}`,
    );

    if (!response.ok) {
      return {
        error: {type: 'Response does not match expected type', code: 406},
        success: false,
      };
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    Alert.alert('Server Error', `Something went wrong: ${error}`);

    return {
      error: {type: 'Server Error', code: 500},
      success: false,
    };
  }
}
