import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  ActionSheet,
} from 'native-base';
import Config from 'react-native-config';

configure({ adapter: new Adapter() });

// Mock your external modules here if needed
// jest
// .mock('react-native-device-info', () => {
//   return { isTablet: jest.fn(() => { return false }) }
// })

ActionSheet.show = (props, indexPress) => {
  return {
    props,
    indexPress,
  };
};

Config.API_URL = 'TEST_API_URL';
Config.API_KEY = 'TEST_API_KEY';
