import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TV_PATH } from 'utils/constants'
import TvPage from './TvPage'

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
        render={({ match }) => (
          <div>Hello Usernames</div>
        )}
      />
    </Switch>
  )
}

export default Home
