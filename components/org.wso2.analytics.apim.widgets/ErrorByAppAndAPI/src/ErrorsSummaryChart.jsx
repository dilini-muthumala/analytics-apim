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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';
import { ViewTypeEnum } from '../../AppAndAPIErrorTable/src/Constants';
import SummaryPieChart from './SummaryPieChart';

const classes = {
    table: {
        minWidth: 650,
        maxWidth: 650,
        marginBottom: 50,
        padding: 0,
    },
    formControl: {
        minWidth: 120,
    },
};

function ErrorsSummaryChart(props) {
    const {
        totalRequestCounts, data4XX, total4XX, data5XX, total5XX, dataFaulty, totalFaulty,
        dataThrottled, totalThrottled, handleViewChange, handleLimitChange, viewType, selectedLimit,
    } = props;

    let viewTypeName;
    if (viewType === ViewTypeEnum.API) {
        viewTypeName = 'APIs';
    }
    if (viewType === ViewTypeEnum.APP) {
        viewTypeName = 'Applications';
    }

    return (
        <div>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <FormControl className={classes.formControl}>
                            <RadioGroup
                                row
                                aria-label='viewType'
                                name='view'
                                value={viewType}
                                onChange={handleViewChange}
                            >
                                <FormControlLabel
                                    value={ViewTypeEnum.APP}
                                    control={<Radio />}
                                    label='By Applications'
                                />
                                <FormControlLabel value={ViewTypeEnum.API} control={<Radio />} label='By Apis' />
                            </RadioGroup>
                        </FormControl>
                    </TableRow>
                    <TableRow>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id='limit-number'
                                label={<FormattedMessage id='limit' defaultMessage='Limit :' />}
                                value={selectedLimit}
                                onChange={handleLimitChange}
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </TableRow>
                    <TableRow>
                        <TableCell align='right'>
                            <SummaryPieChart
                                heading={'4xx errors by ' + viewTypeName}
                                data={data4XX}
                                totalErrors={total4XX}
                                totalRequestCounts={totalRequestCounts}
                            />
                        </TableCell>
                        <TableCell align='right'>
                            <SummaryPieChart
                                heading={'5xx errors by ' + viewTypeName}
                                data={data5XX}
                                totalErrors={total5XX}
                                totalRequestCounts={totalRequestCounts}
                            />
                        </TableCell>
                        <TableCell align='right'>
                            <SummaryPieChart
                                heading={'Faulty summary by ' + viewTypeName}
                                data={dataFaulty}
                                totalErrors={totalFaulty}
                                totalRequestCounts={totalRequestCounts}
                            />
                        </TableCell>
                        <TableCell align='right'>
                            <SummaryPieChart
                                heading={'Throttled summary by ' + viewTypeName}
                                data={dataThrottled}
                                totalErrors={totalThrottled}
                                totalRequestCounts={totalRequestCounts}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

ErrorsSummaryChart.propTypes = {
    data4XX: PropTypes.instanceOf(Object).isRequired,
    data5XX: PropTypes.instanceOf(Object).isRequired,
    dataFaulty: PropTypes.instanceOf(Object).isRequired,
    dataThrottled: PropTypes.instanceOf(Object).isRequired,
    total4XX: PropTypes.number.isRequired,
    total5XX: PropTypes.number.isRequired,
    totalFaulty: PropTypes.number.isRequired,
    totalThrottled: PropTypes.number.isRequired,
    totalRequestCounts: PropTypes.number.isRequired,
    handleViewChange: PropTypes.func.isRequired,
    handleLimitChange: PropTypes.func.isRequired,
    viewType: PropTypes.string.isRequired,
    selectedLimit: PropTypes.number.isRequired,
};

export default ErrorsSummaryChart;
