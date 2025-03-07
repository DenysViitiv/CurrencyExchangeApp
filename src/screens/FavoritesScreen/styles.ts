import {StyleSheet} from 'react-native';
import {fontSize} from '../../utils/constants/fontSize';
import {colors} from '../../utils/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  fromText: {
    fontSize: fontSize.fs20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: fontSize.fs14,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 10,
  },
  headerView: {
    borderBottomColor: colors.gray + '40',
    borderBottomWidth: 1,
  },
  noCurrencies: {
    marginTop: 100,
    alignSelf: 'center',
    fontSize: fontSize.fs20,
    fontWeight: '600',
  },
});

export default styles;
