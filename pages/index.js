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

    this.state = {
      cycles: props.data.bill_cycles,
      visibleUntilIndex: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const windowHeight =
      "innerHeight" in window ?
        window.innerHeight : document.documentElement.offsetHeight;

    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.setState(state => ({
        ...state,
        visibleUntilIndex: state.visibleUntilIndex + 1,
      }));
    }
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
    this.state.cycles[bcIdx].transactions[txnIdx].paid = true;
    this.setState(this.state);
  }

  render() {
    const { cycles, visibleUntilIndex } = this.state;
    const visibleCycles = cycles.filter((c, i) => i <= visibleUntilIndex);

    return (
      <div>
        <Header
          amount={this.calculateTotalAmount(visibleCycles)}
        />

        {visibleCycles.map((bc, key) =>
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
