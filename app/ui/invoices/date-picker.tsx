import { useEffect, useState } from 'react'

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import { ArrowRightIcon } from '@status-im/icons'
import { cva } from 'class-variance-authority'
import { timeFormat } from 'd3-time-format'

import { Button, Calendar } from '../status-components'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { DateRange } from '@status-im/components'

const formatDate = timeFormat('%b %d %Y')

// Update the styles function
const buttonStyles = cva('rounded-lg outline', {
  variants: {
    open: {
      true: 'outline-[1px] -outline-offset-[1px] outline-neutral-80/30 [&_button]:!border-[transparent]',
      false: 'outline-[transparent]',
    },
  },
})

type Props = {
  selected?: DateRange
  onSelect: (selected?: DateRange) => void
}

const DatePicker = (props: Props) => {
  const { onSelect, selected } = props
  const { from, to } = selected || {}

  const [selectedFromDate, setSelectedFromDate] = useState<Date | undefined>(
    props.selected?.from,
  )
  const [selectedToDate, setSelectedToDate] = useState<Date | undefined>(to)
  const [selectedFromDateOpen, setSelectedFromDateOpen] =
    useState<boolean>(false)
  const [selectedToDateOpen, setSelectedToDateOpen] = useState<boolean>(false)

  // It's possible that the parent component will update the selected date range
  useEffect(() => {
    if (from) {
      setSelectedFromDate(from)
    }
  }, [from])

  useEffect(() => {
    if (to) {
      setSelectedToDate(to)
    }
  }, [to])

  const handleSelectFromDate = (date?: Date) => {
    setSelectedFromDate(date)
    setSelectedFromDateOpen(false)

    if (!selectedToDate) {
      setSelectedToDateOpen(true)
      return
    }

    onSelect({ from: date, to: selectedToDate })
  }

  const handleSelectToDate = (date?: Date) => {
    setSelectedToDate(date)
    setSelectedToDateOpen(false)
    onSelect({ from: selectedFromDate, to: date })
  }

  const disableDateSelectedFromDatePlusOne = () => {
    if (selectedFromDate) {
      const date = new Date(selectedFromDate)
      date.setDate(date.getDate() + 1)
      return date
    }
  }

  const resetDates = () => {
    setSelectedFromDate(undefined)
    setSelectedToDate(undefined)
    setSelectedFromDateOpen(false)
    setSelectedToDateOpen(false)
    onSelect(undefined)
  }

  useEffect(() => {
    // Close the date picker when the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // If the user clicks inside the date picker, do nothing
      if (!target.closest('[data-radix-popper-content-wrapper]')) {
        setSelectedFromDateOpen(false)
        setSelectedToDateOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Close the date picker when the user presses the escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedFromDateOpen(false)
        setSelectedToDateOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  return (
    <div className="flex items-center justify-center gap-1 rounded-xl border border-solid border-neutral-80/10 bg-blur-neutral-5/70 pl-3 pr-1 backdrop-blur-sm">
      <span className="mr-1 cursor-default select-none text-13 font-medium text-blur-neutral-80/80 outline-offset-0">
        Filter between
      </span>
      <Root open={selectedFromDateOpen}>
        <Trigger>
          <div
            className={buttonStyles({
              open: selectedFromDateOpen,
            })}
          >
            <Button
              size={24}
              variant="outline"
              onPress={() => {
                if (selectedToDateOpen) {
                  setSelectedToDateOpen(!selectedToDateOpen)
                }
                setSelectedFromDateOpen(!selectedFromDateOpen)
              }}
            >
              {`${
                selectedFromDate ? formatDate(selectedFromDate) : 'Start Date'
              }`}
            </Button>
          </div>
        </Trigger>
        <Portal>
          <Content
            alignOffset={8}
            align="center"
            sideOffset={8}
            className="bg-white-100"
          >
            <Calendar
              mode="single"
              selected={selectedFromDate}
              onSelect={handleSelectFromDate}
              fixedWeeks
              disabled={{
                after: selectedToDate || new Date(),
              }}
            />
          </Content>
        </Portal>
      </Root>

      <span className="cursor-default select-none text-13 font-medium uppercase text-neutral-80/40">
        <ArrowRightIcon size={12} color="$neutral-80/40" />
      </span>

      <Root open={selectedToDateOpen}>
        <Trigger>
          <div
            className={buttonStyles({
              open: selectedToDateOpen,
            })}
          >
            <Button
              size={24}
              variant="outline"
              onPress={() => {
                if (selectedFromDateOpen) {
                  setSelectedFromDateOpen(!selectedFromDateOpen)
                }
                setSelectedToDateOpen(!selectedToDateOpen)
              }}
              disabled={!selectedFromDate}
            >
              {selectedToDate ? formatDate(selectedToDate) : 'End Date'}
            </Button>
          </div>
        </Trigger>
        <Portal>
          <Content
            alignOffset={8}
            align="center"
            sideOffset={8}
            className="bg-white-100"
          >
            <Calendar
              mode="single"
              selected={selectedToDate}
              onSelect={handleSelectToDate}
              fixedWeeks
              disabled={{
                after: new Date(),
                before: disableDateSelectedFromDatePlusOne(),
              }}
            />
          </Content>
        </Portal>
      </Root>
      <div className="h-full min-h-[30px] w-[1px] bg-neutral-80/5 " />

      <Button
        onPress={resetDates}
        variant="ghost"
        size={24}
        disabled={!selectedFromDate}
      >
        Reset
      </Button>
    </div>
  )
}

export { DatePicker }
