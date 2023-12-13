import { fetchFilteredInvoices } from '@/app/lib/data'

import { InvoicesList } from './table-list'

// Types
export type Invoice = {
  id: string
  name: string
  email: string
  amount: number
  date: string
  status: string
  image_url: string
}

type InvoicesTableProps = {
  query: string
  currentPage: number
}

export default async function InvoicesTable({
  query,
  currentPage,
}: InvoicesTableProps) {
  const invoices: Invoice[] = await fetchFilteredInvoices(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <InvoicesList invoices={invoices} />
    </div>
  )
}
