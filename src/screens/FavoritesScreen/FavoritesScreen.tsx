import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {z} from 'zod';

import RateComponent from '../../components/RateComponent/RateComponent';
import {RootState} from '../../redux/store';
import {
  getFavoritesAsync,
  setFavoritesAsync,
} from '../../utils/storage/favoriteCurrencyAsync';
import {getLastDataAsync} from '../../utils/storage/lastCurrencyAsync';
import {
  favoritesSchemas,
  requestLatestDataSchema,
} from '../../utils/zod/schemas';

import styles from './styles';
import Loader from '../../components/Loader/Loader';

const FavoritesScreen = () => {
  const {lastData} = useSelector((state: RootState) => state.parsedLatestData);
  const [lastDataToShow, setLastDataToShow] = useState<z.infer<
    typeof requestLatestDataSchema
  > | null>(null);
  const [allFavorites, setAllFavorites] = useState<
    z.infer<typeof favoritesSchemas>[]
  >([]);
  const [date, setDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFavorite = async (rateName: string) => {
    const updatedFavorites = allFavorites.includes(rateName)
      ? allFavorites.filter(fav => fav !== rateName)
      : [...allFavorites, rateName];

    setAllFavorites(updatedFavorites);
    await setFavoritesAsync(updatedFavorites);
  };

  const getLatesRates = async () => {
    setIsLoading(true);
    let currentDate = new Date();
    if (lastData) {
      setLastDataToShow(lastData);
      currentDate = new Date(lastData.timestamp * 1000);
    } else {
      const savedData = await getLastDataAsync();
      if (savedData) {
        setLastDataToShow(savedData);
        currentDate = new Date(savedData.timestamp * 1000);
      }
    }

    setDate(
      currentDate.toLocaleString('en-GB', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour12: false,
      }),
    );
    setIsLoading(false);
  };

  const getData = async () => {
    await getLatesRates();
    const favorites = await getFavoritesAsync();
    if (favorites) setAllFavorites(favorites);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        {lastDataToShow && (
          <Text style={styles.fromText}>From {lastDataToShow?.base} to</Text>
        )}
        {date && <Text style={styles.dateText}>Last update: {date}</Text>}
      </View>
      <Loader isLoading={isLoading}>
        {lastDataToShow ? (
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={Object.entries(lastDataToShow.rates)}
            renderItem={({item: rate}) => {
              const rateName = rate[0];
              if (!allFavorites.includes(rateName)) return null;

              return (
                <RateComponent
                  rateName={rateName}
                  rateValue={rate[1]}
                  isFavorite={true}
                  handleFavorite={handleFavorite}
                />
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noCurrencies}>
            No favorite currencies available
          </Text>
        )}
      </Loader>
    </View>
  );
};

export default FavoritesScreen;
