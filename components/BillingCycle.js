import { formatDate } from '../utils/utils';
import TransactionsRenderer from './TransactionsRenderer';

export default class BillingCycle extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        {props.transactions.bill_cycles.map((bc, key) => (
          <div className="card" key={key}>
            <p className="label">
              <span className="uc">Bill Cycle: </span>
              {formatDate(bc.bill_cyle_start)} &mdash; {formatDate(bc.bill_cyle_end)}
            </p>

            <TransactionsRenderer
              transactions={bc.transactions}
            />
          </div>
        ))}

        <style jsx>{`
          .card {
            background: #fff;
            padding: 2rem;
            width: 640px;
            margin: 2rem auto;
            box-shadow: 0 0 5px 2px rgba(0,0,0,0.05);
          }
        `}</style>
      </div>
    )
  }
}
