import renderStatusIcon from './StatusIcon';
import TransactionsRenderer from './TransactionsRenderer';

export default class TransactionItem extends React.Component {
  render () {
    const { name, created, amount, status, transactions } = this.props;

    return (
      <div className="relative">
        <span className="status">
          {renderStatusIcon(status)}
        </span>
        <div className="ends">
          <div>
            <p>{name}</p>
            <p className="label">{created}</p>
          </div>
          <div>
            <p>₹{amount}</p>
          </div>
        </div>

        {transactions && <TransactionsRenderer transactions={transactions} />}

        <style jsx>{`
          .relative {
            position: relative;
          }
          .ends {
            display: flex;
            justify-content: space-between;
            align-items: flex-top;
          }
          .status {
            position: absolute;
            left: -2rem;
            top: 0;
          }
        `}</style>
      </div>
    );
  }
}
