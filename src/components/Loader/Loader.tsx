import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../utils/constants/colors';
import styles from './styles';

type LoaderProps = {
  children: React.ReactNode;
  isLoading: boolean;
};
const Loader = ({isLoading, children}: LoaderProps) => {
  if (!isLoading) {
    return children;
  }
  return (
    <ActivityIndicator
      size="large"
      color={colors.green}
      style={styles.activeIndicator}
    />
  );
};

export default Loader;
