import React, {useState} from 'react'
import Moment from 'moment'
import {extendMoment} from 'moment-range'
import {event_filter_buttons} from './EvntFltrBtns.module.scss'
const moment = extendMoment(Moment)

/* Buttons used to quickly filter events by date */
const FilterBtns = ({
  refetch,
  eventRange,
  setEventRange,
  start,
  end,
  setStart,
  setEnd,
  setDatePickerIsOpen,
}) => {
  return (
    <div className={event_filter_buttons}>
      {/* Show events for the current date */}
      <button
        onClick={() => {
          setEventRange('today')
          const start = moment()
            .startOf('day')
            .toISOString()
          const end = moment()
            .endOf('day')
            .toISOString()
          refetch({
            start,
            end,
          })
          setStart(start)
          setEnd(end)
          setDatePickerIsOpen(false)
        }}
        className={`${
          eventRange !== 'ALL' &&
          (moment.range(start, end).contains(
            moment()
              .startOf('day')
              .toISOString(),
          ) ||
            moment.range(start, end).contains(moment().endOf('day')))
            ? 'color_black'
            : 'color_chalice'
        } `}
      >
        Today
      </button>
      {/* Show events for the following date */}
      <button
        onClick={() => {
          const start = moment()
            .add(1, 'day')
            .startOf('day')
            .toISOString()
          const end = moment()
            .add(1, 'day')
            .endOf('day')
            .toISOString()
          setEventRange('tomorrow')
          refetch({
            start,
            end,
          })
          setStart(start)
          setEnd(end)
          setDatePickerIsOpen(false)
        }}
        className={`${
          eventRange !== 'ALL' &&
          (moment.range(start, end).contains(
            moment()
              .add(1, 'day')
              .startOf('day'),
          ) ||
            moment.range(start, end).contains(
              moment()
                .add(1, 'day')
                .endOf('day'),
            ))
            ? 'color_black'
            : 'color_chalice'
        } `}
      >
        Tomorrow
      </button>
      {/* Show events for the upcoming weekend */}
      <button
        onClick={() => {
          setEventRange('this weekend')
          const start = moment()
            .day(6)
            .startOf('day')
            .toISOString()
          const end = moment()
            .day(7)
            .endOf('day')
            .toISOString()
          refetch({
            start,
            end,
          })
          setStart(start)
          setEnd(end)
          setDatePickerIsOpen(false)
        }}
        className={`${
          eventRange !== 'ALL' &&
          (moment.range(start, end).contains(
            moment()
              .day(6)
              .startOf('day'),
          ) ||
            moment.range(start, end).contains(
              moment()
                .day(7)
                .endOf('day'),
            ))
            ? 'color_black'
            : 'color_chalice'
        } `}
      >
        This Weekend
      </button>
      {/* Show all events  */}
      <button
        onClick={() => {
          setEventRange('ALL')
          refetch({start: undefined, end: undefined}) //removes variables, otherwise old variables would be present in query if refetch was empty
          setStart(undefined)
          setEnd(undefined)
          setDatePickerIsOpen(false)
        }}
        className={`${eventRange === 'ALL' ? 'color_black' : 'color_chalice'} `}
      >
        All Upcoming
      </button>
    </div>
  )
}

export default FilterBtns
