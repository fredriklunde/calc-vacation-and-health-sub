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
      healtCareSubThisYear: Math.round(healtCareSub * (workingDaysThisYear / this.daysOfAYear(date))),
      message: 'Baserat på antal dagar du kommer att jobba i år är detta beloppet dom du får i friskvårdsbidrag.'
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
              <h1 className="ui header">Friskvårdsbidragsuträknare</h1>
              <div className="sub header">Välj ett startdatum för att räkna ut hur mycket Friskvårdsbidrag du är berättigad till i år.</div>
              <div style={{paddingTop: '30px'}}>
                <DatePicker
                  onChange={this.onDateChange}
                  value={this.state.startDate}
                />
              </div>
              <h2 class="ui icon header">
                <div class="content">
                  Friskvårdsbidrag: {this.state.healtCareSubThisYear}
                </div>
              </h2>
              {this.renderMessage()}
            </div>
          );
    }
}

export default App;