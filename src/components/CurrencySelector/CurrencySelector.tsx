import React, {useRef, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {z} from 'zod';

import {colors} from '../../utils/constants/colors';
import {symbolsSchema} from '../../utils/zod/schemas';
import styles from './styles';

type CurrencySelectorProps = {
  currencies: z.infer<typeof symbolsSchema>;
  selectedCurrency: string | null;
  setSelectedCurrency: (currency: string) => void;
};

const CurrencySelector = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
}: CurrencySelectorProps) => {
  const currencyArray = Object.entries(currencies.symbols).map(
    ([code, name]) => ({code, name}),
  );

  const [isListVisible, setIsListVisible] = useState(false);
  const [filterText, setFilterText] = useState('');

  const inputRef = useRef<TextInput>(null);

  const filteredCurrencies = currencyArray.filter(currency =>
    currency.code.toUpperCase().includes(filterText.toUpperCase()),
  );

  const handleCurrencySelect = (code: string) => {
    setSelectedCurrency(code);
    setIsListVisible(false);
    inputRef.current?.blur();
    setFilterText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Currency</Text>
      <TextInput
        ref={inputRef}
        onFocus={() => setIsListVisible(true)}
        style={styles.searchInput}
        placeholder={selectedCurrency || 'Search Currency'}
        placeholderTextColor={colors.gray}
        value={filterText}
        onChangeText={text => setFilterText(text.toUpperCase())}
        maxLength={3}
      />

      {isListVisible && (
        <View>
          <FlatList
            data={filteredCurrencies}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.currencyItem,
                  selectedCurrency === item.code && styles.selectedItem,
                ]}
                onPress={() => handleCurrencySelect(item.code)}>
                <Text>
                  {item.code}: {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.code}
            style={styles.currencyList}
          />
        </View>
      )}
    </View>
  );
};

export default CurrencySelector;
