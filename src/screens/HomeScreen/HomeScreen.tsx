import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {z} from 'zod';

import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import Loader from '../../components/Loader/Loader';
import RateComponent from '../../components/RateComponent/RateComponent';

import {getLatesRatesByBase} from '../../services/api/latestCurrency';
import {allCurrencies} from '../../utils/constants/allCurrencies';
import {
  getFavoritesAsync,
  setFavoritesAsync,
} from '../../utils/storage/favoriteCurrencyAsync';
import {
  getLastDataAsync,
  setLastDataAsync,
} from '../../utils/storage/lastCurrencyAsync';
import {
  favoritesSchemas,
  requestLatestDataSchema,
} from '../../utils/zod/schemas';

import {colors} from '../../utils/constants/colors';
import styles from './styles';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [allFavorites, setAllFavorites] = useState<
    z.infer<typeof favoritesSchemas>[]
  >([]);
  const [lastDataToShow, setLastDataToShow] = useState<z.infer<
    typeof requestLatestDataSchema
  > | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const getData = async () => {
    const favorites = await getFavoritesAsync();
    if (favorites) setAllFavorites(favorites);
  };

  const getLatesRates = useCallback(async () => {
    setIsLoading(true);
    setErrorText(null);
    let newDate = new Date();
    let latestData = null;

    if (selectedCurrency) {
      const latestResponse = await getLatesRatesByBase(selectedCurrency);
      if (latestResponse.success) {
        latestData = latestResponse;
        newDate = new Date(latestResponse.timestamp * 1000);
      } else {
        setErrorText(latestResponse.error.type);
      }
    }

    if (!latestData) {
      latestData = await getLastDataAsync();
      if (
        latestData &&
        (!selectedCurrency || selectedCurrency === latestData.base)
      ) {
        setSelectedCurrency(latestData.base);
        newDate = new Date(latestData.timestamp * 1000);
      } else {
        latestData = null;
      }
    }

    setLastDataToShow(latestData);
    if (latestData) await setLastDataAsync(latestData);

    setDate(
      newDate.toLocaleString('en-GB', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour12: false,
      }),
    );
    setIsLoading(false);
  }, [selectedCurrency]);

  const handleFavorite = async (rateName: string) => {
    const updatedFavorites = allFavorites.includes(rateName)
      ? allFavorites.filter(fav => fav !== rateName)
      : [...allFavorites, rateName];

    setAllFavorites(updatedFavorites);
    await setFavoritesAsync(updatedFavorites);
  };

  const filterRates = () => {
    if (!lastDataToShow || !lastDataToShow.rates) return [];
    return Object.entries(lastDataToShow.rates).filter(rate =>
      rate[0].toUpperCase().includes(searchQuery.toUpperCase()),
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getLatesRates();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  useEffect(() => {
    getLatesRates();
  }, [selectedCurrency, getLatesRates]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={'padding'}>
        <View style={styles.headerView}>
          <CurrencySelector
            currencies={allCurrencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
          {selectedCurrency && (
            <Text style={styles.fromText}>From {selectedCurrency} to</Text>
          )}
          {lastDataToShow && (
            <>
              <Text style={styles.dateText}>Last update: {date}</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for currencies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                maxLength={3}
                placeholderTextColor={colors.gray}
              />
            </>
          )}
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>

        <Loader isLoading={isLoading}>
          {selectedCurrency && lastDataToShow && (
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              data={filterRates()}
              renderItem={({item: rate}) => (
                <RateComponent
                  rateName={rate[0]}
                  rateValue={rate[1]}
                  isFavorite={allFavorites.includes(rate[0])}
                  handleFavorite={handleFavorite}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          )}
        </Loader>
      </KeyboardAvoidingView>
    </View>
  );
};

export default HomeScreen;
