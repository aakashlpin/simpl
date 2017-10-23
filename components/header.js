export default () => (
  <div>
    <div className="header">
      <p className="label">Total Amount</p>
      <p className="header--amount">₹500</p>
    </div>
    <style jsx>{`
          .header {
            background: #fff;
            padding: 1rem;
            text-align: center;
            box-shadow: 0 1px 1px 1px rgba(0,0,0,0.05);
          }
          .header p {
            margin: 0;
            line-height: 1.25;
          }
          .label {
            color: #869392;
            font-size: 0.75rem;
            text-transform: uppercase;
          }
          .header--amount {
            font-size: 1.25rem;
            font-weight: 300;
          }
        `}</style>
  </div>
)
