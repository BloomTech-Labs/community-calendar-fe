import {useState, useEffect} from 'react'
import {useApolloClient, useQuery} from '@apollo/react-hooks'
import {useOktaAuth} from '@okta/okta-react'

import {GET_CCID} from '../graphql/getUserId.query'
import {GET_USER_PICTURE} from '../graphql/users.query'

export default function GetUserInfo() {
  const client = useApolloClient()
  const {authState, authService} = useOktaAuth()
  const [user, setUser] = useState(null)

  const [userId, setUserId] = useState('')

  const {data: ccid} = useQuery(GET_CCID, {variables: {oktaId: user}})
  const {data: userImage} = useQuery(GET_USER_PICTURE, {
    variables: {ccid: userId},
  })

  useEffect(() => {
    updateUser()
  }, [authState, authService])

  useEffect(() => {
    if (ccid) {
      setUserId(ccid.user.id)
    }
  }, [ccid])

  const updateUser = async () => {
    if (!authState.isAuthenticated) {
      setUser(null)
    } else {
      await authService.getUser().then((response) => {
        setUser(response.sub)
      })
    }
  }

  if (ccid) {
    client.writeData({data: {userId: ccid.user.id}})
  }

  if (userImage) {
    client.writeData({data: {profileImage: userImage.user.profileImage}})
  }
  return null
}
