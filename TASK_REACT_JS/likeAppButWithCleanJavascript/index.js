class dateInput {
    constructor() {
        this.input = document.querySelector(".input");
    }
}

class dateRange extends dateInput {
    constructor() {
        super();
        this.container = document.querySelector(".containerForLastUpdateRecordAndPeriodItems");
        this.onChange =  this.onChange.bind(this);
        this.input.onchange = this.onChange;
    }

    createItems(period) {
        let dates = [];
        for (let i = period.start; i < +period.end;  i.setDate(i.getDate() + 7)){
            dates.push(new Date(i))
        }

        let periods = [];
        let datesLength = dates.length;

        for(let i=0; i < datesLength; i++) {
            let date = dates[i];
            let dateCopy = new Date(dates[i]);
            if (date.getDay() === 1) periods[i] = `${date.toLocaleDateString()} - ${date.setHours(144).toLocaleDateString()}`;
            else if (date.getDay() === 2) periods[i] = `${new Date(date.setHours(-24)).toLocaleDateString()} -  ${new Date(dateCopy.setHours(120)).toLocaleDateString()}`;
            else if (date.getDay() === 3) periods[i] = `${new Date(date.setHours(-48)).toLocaleDateString()} -  ${new Date(dateCopy.setHours(96)).toLocaleDateString()}`;
            else if (date.getDay() === 4) periods[i] = `${new Date(date.setHours(-72)).toLocaleDateString()} -  ${new Date(dateCopy.setHours(72)).toLocaleDateString()}`;
            else if (date.getDay() === 5) periods[i] = `${new Date(date.setHours(-96)).toLocaleDateString()} -  ${new Date(dateCopy.setHours(48)).toLocaleDateString()}`;
            else if (date.getDay() === 6) periods[i] = `${new Date(date.setHours(-120)).toLocaleDateString()} - ${new Date(dateCopy.setHours(24)).toLocaleDateString()}`;
            else if (date.getDay() === 0) periods[i] = `${new Date(date.setHours(-144)).toLocaleDateString()} - ${dateCopy.toLocaleDateString()}`;
        }

        return periods;
    }

    renderItems(items) {
        if ( items === "") {
            $( ".containerForLastUpdateRecordAndPeriodItems" ).empty();
        }

        if (!$(".containerForLastUpdateRecordAndPeriodItems").is(':empty')){
            $( ".containerForLastUpdateRecordAndPeriodItems" ).empty();
        }

        let element = document.createElement('div');
        this.container.appendChild(element);

        let dayNumber = this.updateTime.getDate();
        let month = this.updateTime.getMonth() + 1;
        let monthNumber = month < 9 || month === 9 ? '0' + month : month;
        let year = this.updateTime.getFullYear();

        element.innerText = `Последнее изменение: ${dayNumber}.${monthNumber}.${year}`;

        items.forEach((item)=> {
            let element = document.createElement('div');
            element.innerText = item;
            this.container.appendChild(element)
        })
    }

    onChange(event) {
        this.inputValue = event.target.value;
        this.updateTime = new Date();
        this.renderItems(this.createItems(this.createPeriod(this.inputValue)));
    }

    createPeriod(date) {
        let initialDate = new Date(date);
        let newDate = new Date(date);

        let year = newDate.getFullYear();
        newDate.setFullYear(year + 1);
        return {start: initialDate, end: newDate}
    }
}
new dateRange();