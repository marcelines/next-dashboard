import { fetchLatestInvoices } from '@/app/lib/data'

import { TableList } from './latest-invoices-content'

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices()

  return <TableList latestInvoices={latestInvoices} />
}
