'use client'

import { useFormState } from 'react-dom'

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { createInvoice } from '@/app/lib/actions'
import { Button } from '@/app/ui/button'

import type { CustomerField } from '@/app/lib/definitions'

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createInvoice, initialState)

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-neutral-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-15 font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-neutral-30 py-2 pl-10 text-15 outline-2 placeholder:text-neutral-30"
              defaultValue=""
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
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-30" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="text-sm text-red-500 mt-2" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="text-sm mb-2 block font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="border-gray-200 text-sm placeholder:text-gray-500 peer block w-full rounded-md border py-2 pl-10 outline-2"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="text-sm text-red-500 mt-2" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="text-sm mb-2 block font-medium">
            Set the invoice status
          </legend>
          <div className="border-gray-200 bg-white rounded-md border px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="border-gray-300 bg-gray-100 text-gray-600 h-4 w-4 cursor-pointer focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="bg-gray-100 text-xs text-gray-600 ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-medium"
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
                  className="border-gray-300 bg-gray-100 text-gray-600 h-4 w-4 cursor-pointer focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="bg-green-500 text-xs text-white ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-medium"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="text-sm text-red-500 mt-2" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 flex h-10 items-center rounded-lg px-4 font-medium transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  )
}
