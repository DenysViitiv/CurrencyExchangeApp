import {StyleSheet} from 'react-native';
import {fontSize} from '../../utils/constants/fontSize';
import {colors} from '../../utils/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  fromText: {
    fontSize: fontSize.fs18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: fontSize.fs14,
    fontWeight: '600',
    marginBottom: 10,
  },
  headerView: {
    borderBottomColor: colors.gray + '40',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: colors.lightRed,
    fontSize: fontSize.fs16,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default styles;
