import Cancelled from '../static/images/cancelled.svg';
import Refund from '../static/images/refund.svg';
import Success from '../static/images/success.svg';

const map = {
  REFUND: <Refund />,
  CANCELLED: <Cancelled />,
  SUCCESS: <Success />,
};

export default (status) => map[status];
