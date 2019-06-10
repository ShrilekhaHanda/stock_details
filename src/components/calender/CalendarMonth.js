import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux'

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';

import { addRecord, deleteRecord } from '../../actions';
import { prevMonth, nextMonth } from '../../actions';


class CalendarMonth extends React.Component {
  state = {
    stockDate: null,
    stockId: null
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

  modalCleanup = (id) => {
    document.getElementById(id).style.display = 'none';
    let ele = document.getElementsByClassName('modal-backdrop');
    for (var i = 0; i < ele.length; i++) {
      ele[i].style.display = 'none';
    }
  }

  addClickHandler = async (e) => {
    const rate = e.target.elements.stockRate.value;
    e.preventDefault(); 
    this.modalCleanup('addModal');

    await addRecord(rate, this.state.stockDate)
    this.props.fetchRecords();
  }

  deleteRecord = async() => {
    this.modalCleanup('deleteModal');

    await deleteRecord(this.state.stockId)
    this.props.fetchRecords();
  }

  deleteClickHandler = (e) => {
    this.setState({ stockId: e.target.getAttribute('data-id') })
  }
  addClick = (e) => {
    this.setState({ stockDate: e.target.getAttribute('data-date')})
  }

  priceEvent = (date) => {
    const value = this.props.allData.filter(price => price.fields.stock_date === date.format('YYYY-MM-DD'))
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
    const { month } = this.props

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
            
          </div>
        ))}
      </div>
    ))
  }

  render () {
    return (
      <div className='calendar__month'>
        {this.renderWeeks()}

        <AddModal formSubmit={this.addClickHandler} stockDate={this.state.stockDate}/>
        <DeleteModal deleteRecord={this.deleteRecord}/>
    </div>
    ) 
  }
}


const mapStateToProps = state => ({
  month: state.calendar.month
})

export default connect(mapStateToProps, { prevMonth, nextMonth })(CalendarMonth);
