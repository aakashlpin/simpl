import React from 'react';
import fetch from 'node-fetch';
import Header from '../components/header';

export default class extends React.Component {
  static async getInitialProps() {
    const fetchTransactions = await fetch('https://pastebin.com/raw/cMfMJ0bu');
    const transactions = await fetchTransactions.json();
    console.log(transactions);
    return transactions;
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
