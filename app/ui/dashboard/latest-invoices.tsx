import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
// import { Avatar } from '@status-im/components'
import { Stack } from 'tamagui'

// import Image from 'next/image'
import { fetchLatestInvoices } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts'

import type { Invoice } from '../invoices/table'

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices()

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-15 md:text-19`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-neutral-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white-100 px-6">
          {latestInvoices.map((invoice: Invoice, i: number) => {
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
                  <Stack bg="neutral-20" height={32} width={32} />
                  {/* <Avatar
                    size={24}
                    src={invoice.image_url}
                    type="user"
                    name=""
                  /> */}
                  {/* <Image
                    key={invoice.id}
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
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
