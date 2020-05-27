import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {
  ADD_EVENT,
  ADD_EVENT_NEW_SERIES,
  ADD_EVENT_EXISTING_SERIES,
} from '../../graphql'
import loadable from '@loadable/component'
import LoadingLogo from '../loading/LoadingLogo'

const EventForm = loadable(
  () => import(/* webpackChunkName: "eventForm" */ './EventForm'),
  {
    fallback: (
      <div
        className='container level is-flex'
        style={{height: '100vh', width: '100vw'}}
      >
        <LoadingLogo />
      </div>
    ),
  },
)

export default function CreateEvent({history}) {
  const [addEvent, {data, error, loading}] = useMutation(ADD_EVENT)
  const [
    addEventNewSeries,
    {data: dataNS, error: errorNS, loading: loadingNS},
  ] = useMutation(ADD_EVENT_NEW_SERIES)
  const [
    addEventExistingSeries,
    {data: dataES, error: errorES, loading: loadingES},
  ] = useMutation(ADD_EVENT_EXISTING_SERIES)

  return (
    <EventForm
      formType='add'
      mutation={addEvent}
      mutationData={data}
      mutationError={error}
      mutationLoading={loading}
      history={history}
      mutationNS={addEventNewSeries}
      mutationDataNS={dataNS}
      mutationErrorNS={errorNS}
      mutationLoadingNS={loadingNS}
      mutationES={addEventExistingSeries}
      mutationDataES={dataES}
      mutationErrorES={errorES}
      mutationLoadingES={loadingES}
    />
  )
}
