import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-13',
        {
          'bg-neutral-100 text-neutral-50': status === 'pending',
          'bg-green-500 text-white-100': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-neutral-50" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white-100" />
        </>
      ) : null}
    </span>
  )
}
