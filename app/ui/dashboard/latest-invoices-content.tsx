'use client'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import { lusitana } from '../fonts'
import { Avatar } from '../status-components'
import { AddUserIcon } from '@status-im/icons'

import { LatestInvoice } from '@/app/lib/definitions'

type Props = {
  latestInvoices: LatestInvoice[]
}

export const TableList = (props: Props) => {
  const { latestInvoices } = props

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-15 md:text-19`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-neutral-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white-100 px-6">
          {latestInvoices.map((invoice: LatestInvoice, i: number) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Avatar
                    size={32}
                    backgroundColor="$blue/40"
                    type="icon"
                    icon={<AddUserIcon size={20} />}
                  />
                  <div className="[&_div]:w-8 [&_div]:h-8">
                    <Avatar
                      size={32}
                      backgroundColor="$blue/40"
                      type="user"
                      src="https://avatars.githubusercontent.com/u/1024025?v=4"
                      name="Márcio Pinto"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-15 font-semibold md:text-19">
                      {invoice.name}
                    </p>
                    <p className="hidden text-15 text-neutral-40 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-15 font-medium md:text-19`}
                >
                  {invoice.amount}
                </p>
              </div>
            )
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-13" />
          <h3 className="ml-2 text-15 text-neutral-40 ">Updated just now</h3>
        </div>
      </div>
    </div>
  )
}
