import { FaceFrownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-neutral-40" />
      <h2 className="text-48 font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-customisation-blue-50 px-4 py-2 text-15 text-white-100 transition-colors hover:bg-customisation-blue-60"
      >
        Go Back
      </Link>
    </main>
  )
}
