import React from 'react';
import DatePicker from 'react-date-picker';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    this.setState({
      startDate: date
    });
  }
    
    render(){
        return (
            <div>
              <h1>Select the date</h1>
              <DatePicker
                onChange={this.onDateChange}
                value={this.state.startDate}
              />
            </div>
          );
    }
}

export default App;