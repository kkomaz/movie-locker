import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import TvPage from './TvPage'

function Home(props) {
  const { userSession } = props

  const [userData] = useState(userSession.loadUserData())

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
