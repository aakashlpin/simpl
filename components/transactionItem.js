import renderStatusIcon from './StatusIcon';
import TransactionsRenderer from './TransactionsRenderer';

export default class TransactionItem extends React.Component {
  render () {
    const {
      index, name, created, amount, status, transactions, onClick, paid,
    } = this.props;

    return (
      <div
        className={`relative trans ${onClick ? 'pointer' : ''} ${paid ? 'paid' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) {
            onClick(index);
          }
        }}
      >
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

        {transactions &&
          <TransactionsRenderer transactions={transactions} />
        }

        <style jsx>{`
          .pointer {
            cursor: pointer;
          }
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
          .trans {
            transition: opacity 0.4s;
          }
          .paid {
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }
}
