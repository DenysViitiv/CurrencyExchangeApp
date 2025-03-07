import {StyleSheet} from 'react-native';
import { fontSize } from '../../utils/constants/fontSize';
import { colors } from '../../utils/constants/colors';

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      position: 'relative',
    },
    title: {
      fontSize: fontSize.fs24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    currencyItem: {
      padding: 10,
      fontSize: 16,
      marginVertical: 5,
      backgroundColor: colors.lightGray,
    },
    selectedItem: {
      backgroundColor: colors.lightGreen,
    },
    currencyList: {
      position: 'absolute',
      width: '100%',
      backgroundColor: colors.white,
      paddingHorizontal: 10,
      zIndex: 2,
      maxHeight: 200,
      borderColor: colors.black,
      borderWidth: 1,
    },
    searchInput: {
      height: 40,
      borderColor: colors.black,
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 5,
      width: '100%',
    },
  });

export default styles;
