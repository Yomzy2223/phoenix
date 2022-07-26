import React from "react";
import { Transactions_info } from "../../assets/Transactions_info";
import TransactionTemp from "./TransactionTemp";
import "../../css/transactions.css";
import { Link } from "react-router-dom";

function Transactions() {
  return (
    <div className="dashboard-transactions">
      <TransactionTemp title={true} type="Type" amount="Amount" date="Date" />
      {Transactions_info.map((trans) => (
        <TransactionTemp
          key={trans.id}
          type={trans.type}
          amount={trans.amount}
          date={trans.date}
        />
      ))}
      <Link className="dashboard-transactions__more" to="/">
        See More
      </Link>
    </div>
  );
}

export default Transactions;
