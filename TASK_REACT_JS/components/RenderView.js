import React from 'react';

export default class RenderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: null
        }
    }

    onFocus = () => {
        this.setState({
            bg: '#900'
        });
        this.props.handleInputAction();
    };

    onBlur = () => {
        this.setState({
            bg: '#ffed5d'
        });
        this.props.handleInputAction();
    };

    render() {
        let {updateTime, period, handleSetNewDates, renderItems, createItems} = this.props;

        let dayNumber;
        let month;
        let monthNumber;
        let year;

        if (updateTime !== null) {
            dayNumber = updateTime.getDate();
            month = updateTime.getMonth() + 1;
            monthNumber = month < 9 || month === 9 ? '0' + month : month;
            year = updateTime.getFullYear();
        }

        return (
            <div>
                <div><input type="date"
                            onChange={(event) => {
                                handleSetNewDates(event.target.value)
                            }}
                            style={{backgroundColor: this.state.bg !== null ? this.state.bg : 'white'}}
                            onBlur={() => this.onBlur()}
                            onFocus={() => this.onFocus()}
                /></div>
                {updateTime === null ? <div>Последнее изменение: загрузка даты... </div> :  <div>{`Последнее изменение: ${dayNumber}.${monthNumber}.${year}`}</div>}
                <div>{period !== null ? renderItems(createItems(period)) : 'Выберите дату'}</div>
            </div>
        )
    }
}
