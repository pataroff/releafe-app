import * as React from 'react';
import { View } from 'react-native';
import { CartesianChart, Area, useChartPressState } from 'victory-native';
import { Circle, useFont } from '@shopify/react-native-skia';
import type { SharedValue } from 'react-native-reanimated';

import poppins from '../../assets/fonts/Poppins-Light.ttf';

// Tool tip
const ToolTip = ({
  x,
  y,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
}) => {
  return (
    <>
      <Circle cx={x} cy={y} r={6} color='black' />
      <Circle cx={x} cy={y} r={5} color='gray' />
    </>
  );
};

// Mock data
const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

export const PerformanceChart = () => {
  const font = useFont(poppins);
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

  return (
    <View style={{ height: 250, marginVertical: 20 }}>
      <CartesianChart
        data={DATA}
        xKey='day'
        yKeys={['highTmp']}
        axisOptions={{ font }}
        chartPressState={state}
      >
        {/* 👇 Render function exposes various data, such as points. */}
        {({ points, chartBounds }) => (
          <>
            {/* 👇 And we'll use the Line component to render a line path. */}
            <Area
              points={points.highTmp}
              y0={chartBounds.bottom}
              color='#c2cbd2'
              curveType='natural'
            />
            {/* 👇 Conditionally show our tooltip and pass values. */}
            {isActive ? (
              <ToolTip x={state.x.position} y={state.y.highTmp.position} />
            ) : null}
          </>
        )}
      </CartesianChart>
    </View>
  );
};

export default PerformanceChart;
