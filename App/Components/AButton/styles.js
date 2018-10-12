import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  button: {
    backgroundColor: Metrics.metrics.background.transparent,
    borderWidth: 0,
    borderRadius: 0,
    elevation: 0,
  },
  filterIcon: {
    color: Platform.OS === 'ios' ? Colors.black : Colors.white,
  },
});
