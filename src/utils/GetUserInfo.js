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

  useEffect(() => {
    updateUser()
  }, [authState, authService])

  useEffect(() => {
    ccid ? setUserId(ccid.user.id) : null
  }, ccid)

  const updateUser = async () => {
    if (!authState.isAuthenticated) {
      setUser(null)
    } else {
      await authService.getUser().then(response => {
        setUser(response.sub)
      })
    }
  }

  const {data: ccid} = useQuery(GET_CCID, {variables: {oktaId: user}})
  const {data: userImage} = useQuery(GET_USER_PICTURE, {
    variables: {ccid: userId},
  })
  ccid ? client.writeData({data: {userId: ccid.user.id}}) : null
  userImage
    ? client.writeData({data: {profileImage: userImage.user.profileImage}})
    : null

  return null
}
