type ContributionData = {
  count: number
  date: string
}

type Props = {
  data: ContributionData[]
}

export default async function ContributionGraph(props: Props) {
  const { data } = props

  const getColor = (count: number): string => {
    if (count === 0) return 'bg-neutral-30'
    if (count < 5) return 'bg-customisation-blue/10'
    if (count < 10) return 'bg-customisation-blue/40'
    return 'bg-green-600'
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-15 md:text-19">Contributions</h2>

      <div className="grid w-full grid-cols-7 gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-sm ${getColor(
              item.count,
            )} cursor-pointer hover:bg-customisation-blue-60`}
            title={`Contributions on ${item.date}: ${item.count}`}
          />
        ))}
      </div>
    </div>
  )
}
