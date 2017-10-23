import { formatDate } from '../utils/utils';
import TransactionsRenderer from './TransactionsRenderer';

export default class BillingCycle extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        <div className="card">
          <p className="label">
            <span className="uc">Bill Cycle: </span>
            {formatDate(props.bill_cyle_start)} &mdash; {formatDate(props.bill_cyle_end)}
          </p>

          <TransactionsRenderer
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
        `}</style>
      </div>
    )
  }
}
