/*
 *  Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

/**
 * Display API Traffic details
 * @param {any} props @inheritDoc
 * @returns {ReactElement} Render the Apim Api Traffic By Version widget body
 */
export default function TrafficChart(props) {
    const { data, themeName } = props;
    const styles = {
        victorybar: {
            display: 'flex',
            flexWrap: 'wrap',
            data: { fill: 'rgb(0, 107, 201)', width: 5 },
        },
        victoryaxis: {
            axisLabel: {
                padding: 30,
                fill: themeName === 'dark' ? '#fff' : '#02212f',
                fontSize: '4px',
            },
        },
    };

    const chartTheme = {
        axis: {
            style: {
                tickLabels: {
                    fill: themeName === 'dark' ? '#fff' : '#02212f',
                    fontSize: '4px',
                    angle: 45,
                },
                grid: { stroke: 'none' },
            },
        },
    };
    return (
        <VictoryChart
            theme={chartTheme}
            domainPadding={{ x: 30 }}
            maxDomain={{ x: 5 }}
            padding={{
                top: 0, bottom: 20, right: 20, left: 20,
            }}
            height={150}
        >
            <VictoryBar
                barWidth={6}
                style={styles.victorybar}
                animate={{
                    duration: 1000,
                    onLoad: { duration: 500 },
                }}
                data={data}
                x='apiVersion'
                y='Traffic'
            />
            <VictoryAxis
                label={'API Version'.toUpperCase()}
                style={styles.victoryaxis}
            />
            <VictoryAxis
                dependentAxis
                label={'Total Traffic'.toUpperCase()}
                style={styles.victoryaxis}
            />
        </VictoryChart>
    );
}

TrafficChart.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    themeName: PropTypes.string.isRequired,
};
