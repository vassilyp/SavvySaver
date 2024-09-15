import transactionData from "../transactionData.json"; // Adjust the path as needed

const TransactionList = () => {
  return (
    <div className="container w-[80%] mx-auto mt-4">
      <h2 className="mb-3 text-xl font-bold rakkas-medium text-center">Transaction History</h2>
      <div className="overflow-x-auto"> {/* Added for responsive table */}
        <table className="min-w-full bg-white border border-gray-300 mx-auto"> {/* Added mx-auto to center the table */}
          <thead>
            <tr className="bg-gray-100 ">
              <th className="py-2 px-4 font-bold">Note</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border font-medium">{transaction.note}</td>
                <td className="py-2 px-4 border">
                  {new Date(transaction.transactedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">${transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
