import React from 'react';
import fetch from 'node-fetch';
import Header from '../components/Header';
import BillingCycle from '../components/BillingCycle';

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
        <BillingCycle
          transactions={this.props.transactions}
        />
      </div>
    );
  }
}
