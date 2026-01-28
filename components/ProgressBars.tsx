interface ProgressBarsProps {
  progressA: { total: number; percentage: number }
  progressB: { total: number; percentage: number }
  goalAmount: number
}

export default function ProgressBars({
  progressA,
  progressB,
  goalAmount,
}: ProgressBarsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Screampy */}
      <div className="bg-dark-gray rounded-xl p-5 sm:p-6 border border-medium-gray shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent/50 group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
              Screampy
            </h3>
            <div className="text-xs text-gray-500">Progress to goal</div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-accent">
              {progressA.total.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">PLN</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{progressA.percentage.toFixed(1)}%</span>
            <span>{goalAmount.toLocaleString()} PLN</span>
          </div>
          <div className="w-full bg-medium-gray rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-700 ease-out flex items-center justify-end pr-2 shadow-lg"
              style={{ width: `${Math.min(progressA.percentage, 100)}%` }}
            >
              {progressA.percentage > 8 && (
                <span className="text-black text-[10px] font-bold">
                  {progressA.percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grzechu */}
      <div className="bg-dark-gray rounded-xl p-5 sm:p-6 border border-medium-gray shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent-orange/50 group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 group-hover:text-accent-orange transition-colors">
              Grzechu
            </h3>
            <div className="text-xs text-gray-500">Progress to goal</div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-accent-orange">
              {progressB.total.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">PLN</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{progressB.percentage.toFixed(1)}%</span>
            <span>{goalAmount.toLocaleString()} PLN</span>
          </div>
          <div className="w-full bg-medium-gray rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-accent-orange to-accent-orange/80 transition-all duration-700 ease-out flex items-center justify-end pr-2 shadow-lg"
              style={{ width: `${Math.min(progressB.percentage, 100)}%` }}
            >
              {progressB.percentage > 8 && (
                <span className="text-white text-[10px] font-bold">
                  {progressB.percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
