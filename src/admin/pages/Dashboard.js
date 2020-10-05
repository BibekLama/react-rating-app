import React, { useEffect, useState } from 'react';
import {PageHeader} from '../components';
import { genreActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
    const dispatch = useDispatch();
    const chart = useSelector(state => state.chart.data);
    useEffect(() => {
        dispatch(genreActions.fetchGenreChart());
        // setOptions({...options, data: [{ type: 'line', dataPoints: chart}]});
    },[]);

    const [options, setOptions] = useState({
        theme: "light2",
        title: {
            text: "Number of Movies in each genre"
        },
        axisY: {
            title: "Number of Movies"
        },
        data: [{
            type: "line",
            dataPoints: [
                {x: "Horror", y:3},
                {x: "Comedy", y:5},
                {x: "Action", y:5}
            ]
        }]
    });

    return(
        <React.Fragment>
            <PageHeader title="Dashboard" />
        </React.Fragment>
    )
}

export { Dashboard };