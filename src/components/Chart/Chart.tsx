import React from "react";
import ReactDOM from "react-dom";
import * as V from "victory";
const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];
const Chart = () => {
  return (
    <div>
      <V.VictoryChart
        // adding the material theme provided with Victory
        theme={V.VictoryTheme.material}
        domainPadding={20}
      >
        <V.VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <V.VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <V.VictoryBar data={data} x="quarter" y="earnings" />
      </V.VictoryChart>
    </div>
  );
};

export default Chart;
