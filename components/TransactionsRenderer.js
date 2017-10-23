import TransactionItem from './TransactionItem';
import { formatDate, formatAmount } from '../utils/utils';

export default ({ transactions, onClick }) => (
  <ul>
    {transactions.map((txn, id) => (
      <li key={id}>
        <TransactionItem
          {...txn}
          index={id}
          onClick={onClick}
          created={formatDate(txn.created)}
          amount={formatAmount(txn.amount_in_paise)}
        />
      </li>
    ))}
    <style jsx>{`
      ul {
        list-style-type: none;
        // margin: 0;
        // padding: 0;
      }

      ul li {
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        box-shadow: inset 0 1px 6px -6px rgba(0,0,0,1);
      }

      // ul li:after {
      //   content: '';
      //   position: absolute;
      //   bottom: 0; left: 0; right: 0;
      //   height: 0;
      //   // border-top: 1px solid rgba(0, 0, 0, 0.1);
      //   // border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      // }

      ul li:last-child {
        border-bottom: none;
      }
    `}</style>
  </ul>
)
