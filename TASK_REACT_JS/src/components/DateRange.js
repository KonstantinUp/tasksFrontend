import React from 'react';
import RenderView from './RenderView'


export default class DateRange extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: null,
            updateTime: null
        }
    }

    handleSetNewDates = (value) => {

        if (this.state.date !== value) {
            this.setState({
                date: value
            });
        }

        fetch('http://worldclockapi.com/api/json/est/now', {method: 'GET'})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`HTTP Error ${res.status}`))
                }
            })
            .then((json) => {
                let date = new Date(json.currentDateTime);
                this.setState({updateTime: date})
            })
            .catch((error) => console.log(error.message));
    };

    renderItems = (items) => {
        return <div>{items.map((value, index) => <div key={index}>{value}</div>)}</div>
    };

    createItems = (period) => {
        let dates = [];
        for (let i = period.start; i < period.end; i.setDate(i.getDate() + 7)) {
            dates.push(new Date(i))
        }

        let periods = [];
        let datesLength = dates.length;

        for (let i = 0; i < datesLength; i++) {
            let date = dates[i];
            let dateCopy = new Date(dates[i]);

            if (date.getDay() === 1) {
                periods[i] = `${date.toLocaleDateString()} - ${new Date(dateCopy.setHours(144)).toLocaleDateString()}`
            }
            else {
                if (date.getDay() === 2) {
                    periods[i] = `${new Date(date.setHours(-24)).toLocaleDateString()} - ${new Date(dateCopy.setHours(120)).toLocaleDateString()}`
                }
                else {
                    if (date.getDay() === 3) {
                        periods[i] = `${new Date(date.setHours(-48)).toLocaleDateString()} - ${new Date(dateCopy.setHours(96)).toLocaleDateString()}`
                    }
                    else {
                        if (date.getDay() === 4) {
                            periods[i] = `${new Date(date.setHours(-72)).toLocaleDateString()} - ${new Date(dateCopy.setHours(72)).toLocaleDateString()}`
                        }
                        else {
                            if (date.getDay() === 5) {
                                periods[i] = `${new Date(date.setHours(-96)).toLocaleDateString()}  - ${new Date(dateCopy.setHours(48)).toLocaleDateString()}`
                            }
                            else {
                                if (date.getDay() === 6) {
                                    periods[i] = `${new Date(date.setHours(-120)).toLocaleDateString()} - ${new Date(dateCopy.setHours(24)).toLocaleDateString()}`
                                }
                                else {
                                    if (date.getDay() === 0) {
                                        periods[i] = `${new Date(date.setHours(-144)).toLocaleDateString()} - ${dateCopy.toLocaleDateString()}`
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return periods;
    };

    createPeriod = (date) => {
        if (date === null || date === "") {
            return null;
        }

        let initialDate = new Date(date);
        let newDate = new Date(date);

        let year = newDate.getFullYear();
        newDate.setFullYear(year + 1);

        return {start: initialDate, end: newDate}
    };

    handleInputAction = () => {
        this.setState((previousState) => ({date: previousState.date}))
    };

    componentDidMount() {
        fetch('http://worldclockapi.com/api/json/est/now', {method: 'GET'})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`HTTP Error ${res.status}`))
                }
            })
            .then((json) => {
                let date = new Date(json.currentDateTime);
                this.setState({updateTime: date})
            })
            .catch((error) => console.log(error.message));
    };

    render() {
        let period = this.createPeriod(this.state.date);

        return (
            <RenderView period={period}
                        handleSetNewDates={this.handleSetNewDates}
                        updateTime={this.state.updateTime}
                        renderItems={this.renderItems}
                        createItems={this.createItems}
                        handleInputAction={this.handleInputAction}
            />
        )
    }
}