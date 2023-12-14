'use client'

import { useFormState } from 'react-dom'

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { updateInvoice } from '@/app/lib/actions'
import { Button } from '@/app/ui/button'

import type { CustomerField, InvoiceForm } from '@/app/lib/definitions'

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm
  customers: CustomerField[]
}) {
  const initialState = { message: null, errors: {} }
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id)
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState)

  return (
    <form action={dispatch}>
      <div className="bg-gray-50 rounded-md p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-15 font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="border-gray-200 placeholder:text-gray-500 peer block w-full cursor-pointer rounded-md border py-2 pl-10 text-15 outline-2"
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="text-gray-500 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="text-red-500 mt-2 text-15" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-15 font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="border-gray-200 placeholder:text-gray-500 peer block w-full rounded-md border py-2 pl-10 text-15 outline-2"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="text-red-500 mt-2 text-15" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-15 font-medium">
            Set the invoice status
          </legend>
          <div className="border-gray-200 rounded-md border bg-white-100 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-neutral-30 bg-neutral-100 text-neutral-80 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-13 font-medium text-neutral-80"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-neutral-30 bg-neutral-100 text-neutral-80 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="bg-green-500 ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-13 font-medium text-white-100"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="text-red-500 mt-2 text-15" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="hover:bg-gray-200 flex h-10 items-center rounded-lg bg-neutral-100 px-4 text-15 font-medium text-neutral-80 transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  )
}
