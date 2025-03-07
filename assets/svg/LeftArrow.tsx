import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../src/utils/constants/colors';

export const LeftArrow = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.57 5.92999L3.5 12L9.57 18.07"
        stroke={colors.white}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5 12H3.67001"
        stroke={colors.white}
        strokeWidth="2.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
