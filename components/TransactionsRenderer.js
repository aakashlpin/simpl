import { TransitionMotion, spring, presets } from 'react-motion';
import TransactionItem from './TransactionItem';
import { formatDate, formatAmount } from '../utils/utils';

export default class TransactionsRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: props.transactions.map((t, i) => ({
        key: i.toString(),
        data: t,
      })),
    };
  }

  getDefaultStyles = () => {
    return this.state.transactions.map(t => ({
      ...t,
      style: {
        height: 0,
        opacity: 0,
      }
    }))
  }

  getNestedTransactions(t) {
    if (t.transactions) {
      return 1 + t.transactions.length;
    }
    return 1;
  }

  getStyles = () => {
    return this.state.transactions.map(t => ({
      ...t,
      style: {
        height: spring(74 * this.getNestedTransactions(t.data), presets.gentle),
        opacity: spring(1, presets.gentle),
      }
    }))
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    }
  }

  render() {
    const { transactions, onClick } = this.props;
    return (
      <div>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willEnter={this.willEnter}
        >{ styles =>
          <ul>
            {styles.map(({ key, data, style }) => (
              <li key={key} style={style}>
                <TransactionItem
                  {...data}
                  index={key}
                  onClick={onClick}
                  created={formatDate(data.created)}
                  amount={formatAmount(data.amount_in_paise)}
                />
              </li>
            ))}
          </ul>
        }
        </TransitionMotion>
        <style jsx>{`
          ul {
            list-style-type: none;
          }

          ul li {
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
          }

          ul li:last-child {
            border-bottom: none;
          }
        `}</style>
      </div>
    )
  }
}
