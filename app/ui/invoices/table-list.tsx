'use client'

import { useState } from 'react'

import { Tag } from '@status-im/components'
import clsx from 'clsx'
import Image from 'next/image'
import { Stack } from 'tamagui'

import { formatCurrency, formatDateToLocal } from '@/app/lib/utils'
import { DeleteInvoice, UpdateInvoice } from '@/app/ui/invoices/buttons'
import InvoiceStatus from '@/app/ui/invoices/status'

import { DatePicker } from './date-picker'

import type { Invoice } from './table'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { DateRange } from '@status-im/components'
import type { MouseEvent } from 'react'

export const InvoicesList = ({ invoices }: { invoices: Invoice[] }) => {
  const [selected, setSelected] = useState<string[]>([])
  const [firstSelected, setFirstSelected] = useState<string | null>(null)

  const handleSelect = (id: string, event: MouseEvent<HTMLInputElement>) => {
    let newSelected = [...selected]

    if (event.shiftKey && firstSelected) {
      const start = invoices.findIndex(invoice => invoice.id === firstSelected)
      const end = invoices.findIndex(invoice => invoice.id === id)
      const ids = invoices
        .slice(Math.min(start, end), Math.max(start, end) + 1)
        .map(invoice => invoice.id)
      newSelected = ids
    } else {
      if (newSelected.includes(id)) {
        newSelected = newSelected.filter(item => item !== id)
      } else {
        newSelected = [...newSelected, id]
        setFirstSelected(id) // Set the first selected item
      }
    }

    setSelected(newSelected)
  }

  const handleSelectAll = () => {
    if (selected.length === invoices.length) {
      setSelected([])
    } else {
      setSelected(invoices.map(invoice => invoice.id))
    }
  }

  const isSelected = (id: string) => selected.includes(id)

  const [selectedDates, setSelectedDates] = useState<DateRange>()

  const onSelect = (selected?: DateRange) => {
    setSelectedDates(selected)
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-neutral-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map(invoice => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white-100 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Stack bg="" height={32} width={32} />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-15 text-neutral-50">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-19 font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-neutral-80 md:table">
            <thead className="rounded-lg text-left text-15">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <div className="flex items-center justify-end">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="h-4 w-4 rounded border-neutral-40 bg-neutral-60 text-customisation-blue-50 focus:ring-2 focus:ring-customisation-blue-50 dark:border-neutral-50 dark:bg-neutral-70 dark:ring-offset-blur-neutral-90/70 dark:focus:ring-customisation-blue-50"
                      onChange={handleSelectAll}
                      checked={selected.length === invoices.length}
                      readOnly
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white-100">
              {invoices?.map(invoice => (
                <tr
                  key={invoice.id}
                  className={clsx([
                    'w-full border-b py-3 text-15 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg',
                    isSelected(invoice.id) && 'bg-customisation-blue-50',
                  ])}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <DatePicker
                        selected={selectedDates}
                        onSelect={onSelect}
                      />
                      <Tag size={32} label="Magic" color="$danger-50" />

                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-3">{invoice.email}</td>
                  <td className="whitespace-nowrap p-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap p-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap p-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center justify-end">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="h-4 w-4 rounded border-neutral-40 bg-neutral-60 text-customisation-blue-50 focus:ring-2 focus:ring-customisation-blue-50 dark:border-neutral-50 dark:bg-neutral-70 dark:ring-offset-blur-neutral-90/70 dark:focus:ring-customisation-blue-50"
                        onClick={event => handleSelect(invoice.id, event)}
                        checked={isSelected(invoice.id)}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
