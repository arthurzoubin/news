import { StackNavigator } from 'react-navigation';
import {
  NewsScreen,
} from '../Containers';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  NewsScreen: {
    screen: NewsScreen,
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'NewsScreen',
  navigationOptions: {
    headerStyle: styles.header,
  },
});

export default PrimaryNav;
