import { CalendarIcon } from '@heroicons/react/24/outline'

import { fetchRevenue } from '@/app/lib/data'
// import { Revenue } from '@/app/lib/definitions'
import { generateYAxis } from '@/app/lib/utils'
import { lusitana } from '@/app/ui/fonts'

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const chartHeight = 350
  // NOTE: comment in this code when you get to this point in the course
  const revenue = await fetchRevenue()
  const { yAxisLabels, topLabel } = generateYAxis(revenue)

  if (!revenue || revenue.length === 0) {
    return <p className="text-gray-400 mt-4">No data available.</p>
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} text-xl md:text-2xl mb-4`}>
        Recent Revenue
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="bg-white mt-0 grid grid-cols-12 items-end gap-2 rounded-md p-4 sm:grid-cols-13 md:gap-4">
          <div
            className="text-sm text-gray-400 mb-6 hidden flex-col justify-between sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map(label => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month: any) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="bg-blue-300 w-full rounded-md"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="text-sm text-gray-400 -rotate-90 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="text-gray-500 h-5 w-5" />
          <h3 className="text-sm text-gray-500 ml-2 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}
