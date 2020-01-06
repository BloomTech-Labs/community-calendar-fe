import React,{useState} from 'react'
import moment from 'moment'
import {event_filter_buttons} from './EvntFltrBtns.module.scss'

/* Buttons used to quickly filter events by date */
const FilterBtns = ({refetch}) => {
  const [eventRange, setEventRange] = useState('ALL')
  return (
  <div className={event_filter_buttons}>
    {/* Show events for the current date */}
      <button
          onClick={() => {
            setEventRange('today')
            refetch({
              start: moment()
                .startOf('day')
                .toISOString(),
              end: moment()
                .endOf('day')
                .toISOString(),
            })
          }}
          className={`${
            eventRange === 'today' ? 'color_black' : 'color_chalice'
          } is-size-4`}
        >
          Today
        </button>
    {/* Show events for the following date */}
        <button
          onClick={() => {
            setEventRange('tomorrow')
            refetch({
              start: moment()
                .add(1, 'day')
                .startOf('day')
                .toISOString(),
              end: moment()
                .add(1, 'day')
                .endOf('day')
                .toISOString(),
            })
          }}
          className={`${
            eventRange === 'tomorrow' ? 'color_black' : 'color_chalice'
          } is-size-4`}
        >
          Tomorrow
        </button>
    {/* Show events for the upcoming weekend */}
        <button
          onClick={() => {
            setEventRange('this weekend')
            refetch({
              start: moment()
                .day(6)
                .startOf('day')
                .toISOString(),
              end: moment()
                .day(7)
                .endOf('day')
                .toISOString(),
            })
          }}
          className={`${
            eventRange === 'this weekend' ? 'color_black' : 'color_chalice'
          } is-size-4`}
        >
          This Weekend
        </button>
    {/* Show all events  */}
        <button
          onClick={() => {
            setEventRange('ALL')
            refetch({start: undefined, end: undefined}) //removes variables, otherwise old variables would be present in query if refetch was empty
          }}
          className={`${
            eventRange === 'ALL' ? 'color_black' : 'color_chalice'
          } is-size-4`}
        >
          All Upcoming
        </button>
  </div>
)}


export default FilterBtns
