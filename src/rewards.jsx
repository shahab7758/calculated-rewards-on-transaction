import { useEffect, useState } from "react";
// eslint-disable-next-line import/namespace
import { fetchCustomersRecord } from "./API/index.js";

const Rewards = () => {
  const [customersRecord, setCustomersRecord] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetchCustomersRecord();
      setCustomersRecord(res);
    })();
  }, []);

  const perMonthPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points = (amount - 100) * 2 + 50;
    } else if (amount > 50 && amount <= 100) {
      points = (amount - 50) * 1;
    }
    return points;
  };

  const calculatePoints = (transactions) => {
    const firstMonthPoints = perMonthPoints(transactions["firstMonth"]);
    const secondMonthPoints = perMonthPoints(transactions["secondMonth"]);
    const thirdMonthPoints = perMonthPoints(transactions["thirdMonth"]);
    return {
      firstMonthPoints,
      secondMonthPoints,
      thirdMonthPoints,
      total: firstMonthPoints + secondMonthPoints + thirdMonthPoints,
    };
  };

  return (
    <div className="rewards">
      <h1>Rewards</h1>
      <table id="customers">
        <tr>
          <th>No</th>
          <th>Customer Name</th>
          <th>First Month Amount Spent / Points</th>
          <th>Second Month Amount Spent / Points</th>
          <th>Third Month Amount Spent / Points</th>
          <th>Total</th>
        </tr>
        {customersRecord?.map((customer, index) => {
          const rewards = calculatePoints(customer.transactions);
          return (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>
                {`${customer.transactions.firstMonth} /
                ${rewards.firstMonthPoints}`}
              </td>
              <td>{`${customer.transactions.secondMonth} / ${rewards.secondMonthPoints}`}</td>
              <td>
                {`${customer.transactions.thirdMonth} /${rewards.thirdMonthPoints}`}
              </td>
              <td>{rewards.total}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Rewards;
