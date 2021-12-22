import React from "react";

import {VictoryPie} from "victory";

const PieChart = () => {
  return (
    <>
     <VictoryPie data={[
         {x:'a',y:35},
         {x:'b',y:40},
         {x:'c',y:55},
     ]} />
    </>
  );
};

export default PieChart;
