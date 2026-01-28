interface Transaction {
  id: string
  amount: number
  description: string
  transaction_date: string
  player: string
  created_at: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

const getPlayerName = (player: string) => {
  return player === 'A' ? 'Screampy' : 'Grzechu'
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-dark-gray rounded-xl p-8 sm:p-12 border border-medium-gray text-center text-gray-400">
        <div className="text-4xl mb-4 opacity-50">📊</div>
        <p className="text-sm sm:text-base">No transactions yet. Add your first transaction to start tracking.</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="bg-dark-gray rounded-xl border border-medium-gray overflow-hidden shadow-lg">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-medium-gray/50 border-b border-light-gray">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Player
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="border-b border-light-gray/30 last:border-b-0 hover:bg-medium-gray/30 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-6 py-4 text-sm text-gray-300">
                  {formatDate(transaction.transaction_date)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                      transaction.player === 'A'
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                    }`}
                  >
                    {getPlayerName(transaction.player)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  {transaction.amount >= 0 ? (
                    <span className="text-accent">+{transaction.amount.toFixed(2)}</span>
                  ) : (
                    <span className="text-red-400">{transaction.amount.toFixed(2)}</span>
                  )} PLN
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {transaction.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-light-gray/30">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="p-4 hover:bg-medium-gray/30 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                      transaction.player === 'A'
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                    }`}
                  >
                    {getPlayerName(transaction.player)}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {transaction.amount >= 0 ? (
                      <span className="text-accent">+{transaction.amount.toFixed(2)}</span>
                    ) : (
                      <span className="text-red-400">{transaction.amount.toFixed(2)}</span>
                    )} PLN
                  </span>
                </div>
                <p className="text-sm text-gray-300">{transaction.description}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {formatDate(transaction.transaction_date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
