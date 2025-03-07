import {StyleSheet} from 'react-native';
import {colors} from '../utils/constants/colors';
import {fontSize} from '../utils/constants/fontSize';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.green,
    height: 120,
  },
  favoritesButton: {
    marginRight: 20,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  favoriteText: {
    fontSize: fontSize.fs18,
  },
  backButton: {
    marginLeft: 15,
    borderColor: colors.lightGray + '50',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: fontSize.fs20,
  },
});

export default styles;
