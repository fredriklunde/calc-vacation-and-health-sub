import React from 'react';
import DatePicker from 'react-date-picker';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      dayOfYear: null,
      healtCareSub: 0
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  isLeapYear(year) {
     return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  daysOfAYear(year) { 
    return this.isLeapYear(year) ? 366 : 365;
  }

  calculateDayOfYear(date){
    return(Math.ceil((date - new Date(date.getFullYear(),0,1)) / 86400000))
  }

  calculateHealthCareSub(date){
    const dayOfYear = this.calculateDayOfYear(date);
    this.setState({dayOfYear: dayOfYear})
    const workingDaysThisYear = this.daysOfAYear(date) - dayOfYear;
    this.setState({
      healtCareSub: 5000 * (workingDaysThisYear / this.daysOfAYear(date))
    }) 
  }
 
  onDateChange(date) {
    this.setState({
      startDate: date,
    });
    if(date){
      this.calculateHealthCareSub(date);
    }
  }

  renderStartDate(){
    if(this.state.startDate){
      return (
        <div>
          Startdatum: {this.state.startDate.toDateString()}
        </div>
      )
    }
    return
  }
    
    render(){
        return (
            <div className="ui container">
              <h1>Friskvårdsbidragsuträknare</h1>
              <h3>Välj ett startdatum för att räkna ut hur mycket Friskvårdsbidrag du är berättigad till i år.</h3>
              <DatePicker
                onChange={this.onDateChange}
                value={this.state.startDate}
              />
              {this.renderStartDate()}
              <h5>
                Friskvårdsbidrag: {this.state.healtCareSub}
              </h5>
            </div>
          );
    }
}

export default App;