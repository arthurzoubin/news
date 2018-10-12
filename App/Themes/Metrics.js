import { Dimensions } from 'react-native';

// Used via Metrics.baseMargin
const metrics = {
  device: {
    width: Dimensions.width,
    height: Dimensions.height,
  },
  center: 'center',
  flexDirection: {
    row: 'row',
    column: 'column',
  },
  background: {
    transparent: 'transparent',
  },
  initialMargin: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  initialPadding: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
};

const margin = {
  margin16: 16,
};

const padding = {
  padding16: 16,
};

export default {
  metrics,
  margin,
  padding,
};
