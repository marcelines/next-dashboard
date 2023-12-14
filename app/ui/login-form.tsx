'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { ArrowRightIcon } from '@heroicons/react/20/solid'
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'

import { authenticate } from '@/app/lib/actions'
import { lusitana } from '@/app/ui/fonts'

import { Button } from './button'

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-neutral-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-48`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-13 font-medium text-neutral-80"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-neutral-30 py-[9px] pl-10 text-15 outline-2 placeholder:text-neutral-50"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-50 peer-focus:text-neutral-80" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-13 font-medium text-neutral-80"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-neutral-30 py-[9px] pl-10 text-15 outline-2 placeholder:text-neutral-50"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-50 peer-focus:text-neutral-80" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-danger-50" />
              <p className="text-15 text-danger-50">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-neutral-50" />
    </Button>
  )
}
