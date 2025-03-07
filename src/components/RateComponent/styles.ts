import {StyleSheet} from 'react-native';
import {colors} from '../../utils/constants/colors';
import {fontSize} from '../../utils/constants/fontSize';

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  rateName: {
    fontSize: fontSize.fs18,
    minWidth: 40,
  },
  rateScore: {
    fontSize: fontSize.fs18,
    marginLeft: 30,
    textAlign: 'center',
    alignSelf: 'center',
    minWidth: 40,
  },
  rateNumber: {
    fontSize: fontSize.fs18,
    textAlign: 'center',
    alignSelf: 'center',
    minWidth: 40,
    flex: 1,
    marginRight: 30,
  },
  containerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default styles;
