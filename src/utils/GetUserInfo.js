import {useState, useEffect} from 'react'
import {useApolloClient, useQuery} from '@apollo/react-hooks'
import {useOktaAuth} from '@okta/okta-react'

import {GET_CCID} from '../graphql/getUserId.query'

export default function GetUserInfo() {
  const client = useApolloClient()
  const {authState, authService} = useOktaAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    updateUser()
  }, [authState, authService])

  const updateUser = async () => {
    if (!authState.isAuthenticated) {
      setUser(null)
    } else {
      await authService.getUser().then(response => {
        setUser(response.sub)
        console.log(response)
      })
    }
  }

  const {data: ccid} = useQuery(GET_CCID, {variables: {oktaId: user}})
  ccid ? client.writeData({data: {userId: ccid.user.id}}) : null

  return null
}
