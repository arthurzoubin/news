import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes';

export const loaderColor = Colors.black;

export default StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: (Metrics.metrics.device.width - 20) / 2,
    height: 160,
    margin: 5,
  },
  itemImageWrapper: {
    backgroundColor: Colors.grey,
    width: (Metrics.metrics.device.width - 20) / 2,
    height: 120,
  },
  itemText: {
    fontSize: Fonts.size.medium,
    lineHeight: 20,
  },
  itemImage: {
    width: (Metrics.metrics.device.width - 20) / 2,
    height: 120,
  },
});
