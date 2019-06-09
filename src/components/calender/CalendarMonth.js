import React from 'react';
import moment from 'moment';

import ReminderItem from './ReminderItem';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';

import { fetchRecords, addRecord, deleteRecord } from '../../actions';


class CalendarMonth extends React.Component {
  state = {
    prices: [],
    stockDate: null,
    stockId: null
  }

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = async () => {
    const data = await fetchRecords();
    this.setState({ prices: data })
  }

  getDayClass = (day) => {
    const today = moment()
    const classes = ['week__day']

    if (today.isSame(day, 'd')) {
      classes.push('week__day--today')
    }

    if (today < day) {
      classes.push('week__day--future')
    }

    if (day.day() === 0 || day.day() === 6) {
      classes.push('week__day--weekend')
    }

    return classes.join(' ')
  }


  addClickHandler = async (e) => {
    const rate = e.target.elements.stockRate.value;
    e.preventDefault(); 

    document.getElementsByClassName('modal-backdrop')[0].style.display = 'none';
    document.getElementById('addModal').style.display = 'none';
    //document.getElementById('addModal').modal('hide')
    await addRecord(rate, this.state.stockDate)
    this.fetchRecords();
  }

  deleteRecord = async() => {
    //document.getElementById('deleteModal').classList.remove('show');
    //document.getElementsByClassName('modal-backdrop')[0].classList.remove('show');
    document.getElementsByClassName('modal-backdrop')[0].style.display = 'none';
    document.getElementById('deleteModal').style.display = 'none';
    //document.getElementsByTagName('body')[0].classList.remove('modal-open');

    await deleteRecord(this.state.stockId)
    this.fetchRecords();
  }

  deleteClickHandler = (e) => {
    this.setState({ stockId: e.target.getAttribute('data-id') })
  }
  addClick = (e) => {
    this.setState({ stockDate: e.target.getAttribute('data-date')})
  }

  priceEvent = (date) => {
    const value = this.state.prices.filter(price => {
      return (price.fields.stock_date === date.format('YYYY-MM-DD'))
    })
    if(value.length){
      return <p className="stock__price text-center">
        {value[0].fields.stock_price} Rs.
          <button
          className="btn p-0 stock__delete"
          data-toggle="modal"
          data-target="#deleteModal"
          data-id={value[0].id}
          onClick={this.deleteClickHandler}>
          &times;
          </button>
      </p>
    }
    else {
      if (moment() < date) {
        return
      }
      return <button
        className="btn btn-outline-success py-0"
        data-date={date.format('YYYY-MM-DD')}
        data-toggle="modal"
        data-target="#addModal"
        onClick={this.addClick}>
        Add
      </button>
    }

  }

  renderWeeks = (week, index) => {
    const { month, actions } = this.props

    // TODO: Clean this up and pop in to a list component
    return month.map((week, index) => (
      <div key={week.uuid} className='week'>
        {week.days.map((weekday, index) => (
          <div
            key={weekday.uuid}
            className={this.getDayClass(weekday.date)}
          >
            <p className="mb-0">
              {weekday.date.format('D')}
            </p>

            {this.priceEvent(weekday.date)}
            
            {weekday.reminders.map((reminder) => (
              <ReminderItem
                key={reminder.uuid}
                reminder={reminder}
                weekIndex={week.index}
                weekdayIndex={weekday.index}
                editReminder={actions.editReminder}
                deleteReminder={actions.deleteReminder}
              />
            ))}
          </div>
        ))}
      </div>
    ))
  }

  render () {
    return this.state.prices.length ? (
      <div className='calendar__month'>
        {this.renderWeeks()}

        <AddModal formSubmit={this.addClickHandler} stockDate={this.state.stockDate}/>
        <DeleteModal deleteRecord={this.deleteRecord}/>
    </div>
    ) : null
  }
}

// CalendarMonth.propTypes = propTypes

export default CalendarMonth
// export default connect(null, null)(CalendarMonth)
