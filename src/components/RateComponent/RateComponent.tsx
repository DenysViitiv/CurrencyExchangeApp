import {Text, TouchableOpacity, View} from 'react-native';
import {HeartIcon} from '../../../assets/svg/HeartIcon';
import styles from './styles';

type RateComponentProps = {
  rateName: string;
  rateValue: number;
  isFavorite: boolean;
  handleFavorite: (item: string) => void;
};

const RateComponent = ({
  rateName,
  rateValue,
  isFavorite,
  handleFavorite,
}: RateComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={styles.rateName}>{rateName}</Text>
        <Text style={styles.rateScore}>-</Text>
        <Text style={styles.rateNumber}>{rateValue}</Text>
      </View>
      <TouchableOpacity onPress={() => handleFavorite(rateName)}>
        <HeartIcon filled={isFavorite} />
      </TouchableOpacity>
    </View>
  );
};

export default RateComponent;
