import React from "react";
import "../../css/transaction_temp.css";

function TransactionTemp({ type, amount, date, title }) {
  return (
    <div
      className="dashboard__transaction-temp"
      style={{ fontWeight: title ? 700 : "" }}
    >
      <p className="dashboard__transaction-temp__field">{type}</p>
      <p className="dashboard__transaction-temp__field">{amount}</p>
      <p className="dashboard__transaction-temp__field">{date}</p>
    </div>
  );
}

export default TransactionTemp;
