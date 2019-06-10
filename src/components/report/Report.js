import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import { fetchRecords } from '../../actions';


class Report extends React.Component {
  state = {
    buyDate: "2019-06-01",
    sellDate: "2019-06-05"
  }

  maxProfit = (prices) => {
    let minPrice = prices[0];
    let maxProfit = prices[1] - prices[0];

    for (let i = 1; i < prices.length; i++) {
      let currentPrice = prices[i];
      let potentialProfit = currentPrice - minPrice;
      maxProfit = Math.max(maxProfit, potentialProfit);
      minPrice = Math.min(minPrice, currentPrice);
    }

    return maxProfit;
  }
  render() {
    let { stockDate, stockPrice} = this.props;
    let dateSplit = [];
    if (stockDate.length){
      dateSplit = stockDate[0].split('-');
    }

    return (
      <div className="mt-4"> 
        <div className="container">
          <p>Rs. 500</p>
          <p>Max Profit: {this.maxProfit(stockPrice.reverse().slice(1, 10))}</p>
        </div>

        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: 'Stock price chart'
              },
              xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                  day: '%e. %b'
                }
              },
              series: [{
                data: stockPrice,
                pointStart: Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2]),
                pointInterval: 24 * 3600 * 1000
              }]
            }}
          />
        </div>
      
        <div className="row mt-4 text-center">

          <div className="buy__date col-6 mt-3">
              <input type="date" className="w-100" value={this.state.buyDate} onChange={e => this.setState({ buyDate: e.target.value })}/>
              <button className="btn btn-success mt-3">Buy date</button>
          </div>


          <div className="sell__date col-6 mt-3">            
              <input type="date" className="w-100" value={this.state.sellDate} onChange={e => this.setState({ sellDate: e.target.value })}/>
              <button className="btn btn-success mt-3">Sell date</button>
          </div>

        </div>
      </div>
    )
  }
}

export default Report;