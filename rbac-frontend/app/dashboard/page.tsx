import React from 'react'

type Stat = {
  title: string
  value: string
  delta?: string
}

const StatCard: React.FC<Stat> = ({ title, value, delta }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 flex flex-col">
      <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
      <div className="mt-2 flex items-baseline gap-3">
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
        {delta && (
          <div className="text-sm text-green-600 dark:text-green-400">{delta}</div>
        )}
      </div>
    </div>
  )
}

const SimpleLineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const width = 300
  const height = 80
  const max = Math.max(...data)
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * height}`)
    .join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
      <polyline
        fill="none"
        stroke="#4F46E5"
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - (v / max) * height
        return <circle key={i} cx={x} cy={y} r={2} fill="#4F46E5" />
      })}
    </svg>
  )
}

export default function Page() {
  // Mocked analytics data
  const stats = {
    totalUsers: 12450,
    activeSessions: 342,
    revenue: 12840.75,
    engagementPct: 72,
    dailyActive: [120, 150, 140, 160, 180, 170, 200, 210, 190, 220, 230, 200],
  }

  const statCards = [
    { title: 'Total users', value: stats.totalUsers.toLocaleString(), delta: '+4.2%' },
    { title: 'Active sessions', value: stats.activeSessions.toString(), delta: '+1.8%' },
    { title: 'Revenue (USD)', value: `$${stats.revenue.toLocaleString()}`, delta: '+6.3%' },
  ]

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Overview of your key metrics</p>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {statCards.map((s) => (
            <StatCard key={s.title} title={s.title} value={s.value} delta={s.delta} />
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Daily active users</h2>
              <div className="text-sm text-gray-500 dark:text-gray-300">Last 30 days</div>
            </div>
            <div className="mt-4">
              <SimpleLineChart data={stats.dailyActive} />
            </div>
            <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>Avg: {(stats.dailyActive.reduce((a, b) => a + b, 0) / stats.dailyActive.length).toFixed(0)}</div>
              <div>Engagement: {stats.engagementPct}%</div>
            </div>
          </div>

          <aside className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">Top sources</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex justify-between"><span>Organic Search</span><span className="font-semibold">48%</span></li>
              <li className="flex justify-between"><span>Direct</span><span className="font-semibold">26%</span></li>
              <li className="flex justify-between"><span>Referral</span><span className="font-semibold">14%</span></li>
              <li className="flex justify-between"><span>Social</span><span className="font-semibold">12%</span></li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  )
}
