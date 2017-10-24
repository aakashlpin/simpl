import { formatDate } from '../utils/utils';
import TransactionsRenderer from './TransactionsRenderer';

export default (props) => (
  <div>
    <div className="card">
      <p className="label">
        <span className="uc">Bill Cycle: </span>
        {formatDate(props.bill_cyle_start)} &mdash; {formatDate(props.bill_cyle_end)}
      </p>

      <TransactionsRenderer
        onClick={props.onClick}
        transactions={props.transactions}
      />
    </div>

    <style jsx>{`
          .card {
            background: #fff;
            padding: 2rem;
            width: 640px;
            margin: 2rem auto;
            box-shadow: 0 0 5px 2px rgba(0,0,0,0.05);
          }
          @media screen and (max-width: 768px) {
            .card {
              padding: 1rem;
              width: 95%;
              margin: 1rem auto;
            }
          }
        `}</style>
  </div>
)
