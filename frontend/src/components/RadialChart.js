import React from "react";
import { VictoryPie } from "victory";
import PropTypes from 'prop-types'


const RadialChart = ({overdue, pending, paid}) => {
    return <VictoryPie 
    data={[
        { x: "Overdue", y: overdue },
        { x: "Pending", y: pending },
        { x: "Paid", y: paid },
    ]}
    colorScale={["#FCB1B1", "#FFD600", "#D4FFBA"]}
    labels={({ datum }) => datum.y > 5 ? datum.x : null}
    />;
};

RadialChart.propTypes = {
    overdue: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
    paid: PropTypes.number.isRequired,
}

export default RadialChart;
