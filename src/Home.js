import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TV_PATH } from 'utils/constants'
import TvPage from './TvPage'
import PublicUserTvShows from './PublicUserTvShows'
import PrivateUserTvShows from './PrivateUserTvShows'

function Home(props) {
  const { userSession } = props
  const [userTvList, setUserTvList] = useState([])

  const [userData] = useState(userSession.loadUserData())

  useEffect(() => {
    const fetchUserTvList = async () => {
      const options = { decrypt: false }
      const result = await userSession.getFile(TV_PATH, options)
      setUserTvList(JSON.parse(result))
    }

    fetchUserTvList()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={({ match }) => (
          <TvPage
            userSession={userSession}
            userData={userData}
            userTvList={userTvList}
            setUserTvList={setUserTvList}
          />
        )}
      />
      <Route
        exact
        path="/:username/movies"
        render={({ match }) => {
          if (match.params.username !== userData.username) {
            return (
              <PublicUserTvShows
                userSession={userSession}
                username={match.params.username}
              />
            )
          }

          return (
            <PrivateUserTvShows
              userSession={userSession}
              username={userData.username}
              userTvList={userTvList}
              setUserTvList={setUserTvList}
            />
          )
        }}
      />
    </Switch>
  )
}

export default Home
