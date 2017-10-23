import React from 'react';
import fetch from 'node-fetch';
import Header from '../components/header';
import BillCycleTransactions from '../components/transactions';

export default class extends React.Component {
  static async getInitialProps() {
    const fetchTransactions = await fetch('https://pastebin.com/raw/cMfMJ0bu');
    const transactions = await fetchTransactions.json();
    return {
      transactions,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <BillCycleTransactions
          transactions={this.props.transactions}
        />
      </div>
    );
  }
}
