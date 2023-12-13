import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

import AcmeLogo from '@/app/ui/acme-logo'

import { lusitana } from './ui/fonts'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-neutral-40 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-neutral-40 px-6 py-10 md:w-2/5 md:px-20">
          <div className="h-0 w-0 border-x-[20px] border-b-[30px] border-x-[transparent] border-b-blur-neutral-100/70" />
          <p
            className={`text-27 text-neutral-80 md:text-40 md:leading-normal ${lusitana.className}`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a
              href="https://nextjs.org/learn/"
              className="text-customisation-blue-50"
            >
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-customisation-blue-50 px-6 py-3 text-15 font-medium text-white-100 transition-colors hover:bg-customisation-blue-50"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  )
}
