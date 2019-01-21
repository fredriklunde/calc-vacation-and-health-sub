import React from 'react';
import DatePicker from 'react-date-picker';

const healtCareSub = 5000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      dayOfYear: null,
      healtCareSubThisYear: 0,
      message: null
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
      healtCareSubThisYear: Math.round(healtCareSub * (workingDaysThisYear / this.daysOfAYear(date)))
    }) 
  }
 
  onDateChange(date) {
    this.setState({
      startDate: date,
    });
    if(date){
      if(date.getFullYear() < new Date().getFullYear()){
        this.setState({
          healtCareSubThisYear: 5000,
          message: 'Eftersom du började förra året så har du fullt friskvårdsbidrag i år.'
        }) 
        return
      }
      this.setState({
        message: null
      })
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
  }

  renderMessage(){
    if(this.state.message){
      return(
        <h5 className="ui info message">
          {this.state.message}
        </h5>
      )
    }
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
                Friskvårdsbidrag: {this.state.healtCareSubThisYear}
              </h5>
              {this.renderMessage()}
            </div>
          );
    }
}

export default App;