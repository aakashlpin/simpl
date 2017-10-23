import React from 'react';
import fetch from 'node-fetch';
import Header from '../components/Header';
import BillingCycle from '../components/BillingCycle';

export default class extends React.Component {
  static async getInitialProps() {
    const fetchTransactions = await fetch('https://pastebin.com/raw/cMfMJ0bu');
    const data = await fetchTransactions.json();
    return {
      data,
    };
  }

  constructor(props) {
    super(props);

    const initialBillingCycle = props.data.bill_cycles[0];
    this.state = {
      shownBillingCycles: [initialBillingCycle],
    };
  }

  calculateTotalAmount(cycles) {
    const def = x => typeof x !== 'undefined';

    /**
     * removes `transactions` key from an object
     */
    const withoutTransactions = x =>
      Object.keys(x).filter(key => key !== 'transactions').reduce((obj, key) => {
        obj[key] = x[key];
        return obj;
      }, {});

    /**
     * flattens a nested `transactions` array
     */
    const f = ([x, ...xs]) =>
      def(x) ?
        x.paid ?
          [...f(xs)] :
          x.transactions ?
            'amount_in_paise' in x ?
              [...f(x.transactions), ...f(xs), withoutTransactions(x)] :
              [...f(x.transactions), ...f(xs)] :
            [...f(xs), x] :
        [];

    const transactions = f(cycles);

    /**
     * if status is `SUCCESS`, add to sum
     * subtract otherwise
     */
    return (transactions.reduce((sum, txn) => {
      if (txn.status === 'SUCCESS') {
        sum += Number(txn.amount_in_paise);
      } else {
        sum -= Number(txn.amount_in_paise);
      }
      return sum;
    }, 0) / 100);
  }

  handleClick(bcIdx, txnIdx) {
    this.state.shownBillingCycles[bcIdx].transactions[txnIdx].paid = true;
    this.setState(this.state);
  }

  render() {
    const { shownBillingCycles } = this.state;

    return (
      <div>
        <Header
          amount={this.calculateTotalAmount(shownBillingCycles)}
        />

        {shownBillingCycles.map((bc, key) =>
          <BillingCycle
            key={key}
            {...bc}
            onClick={this.handleClick.bind(this, key)}
          />
        )}
      </div>
    );
  }
}
