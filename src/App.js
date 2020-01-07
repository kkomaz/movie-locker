import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { appConfig } from 'utils/constants'
import { Container, Navbar, Button, Card } from 'react-bootstrap'
import { UserSession } from 'blockstack'
import { withRouter } from 'react-router-dom'
import Home from './Home'

function App(props) {
  const [userSession] = useState(new UserSession({ appConfig }))
  const { history } = props

  useEffect(() => {
    const getHandlePendingSignIn = async () => {
      const userData = await userSession.handlePendingSignIn()

      if (!userData.username) {
        throw new Error('This app requires a username')
      }

      window.location = "/"
    }

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      getHandlePendingSignIn()
    }
  }, [])

  const handleSignOut = () => {
    userSession.signUserOut()
    window.location = '/'
  }

  const handleSignIn = () => {
    userSession.redirectToSignIn()
  }

  const goHome = () => {
    const { history } = props
    history.push('/')
  }

  const goToMyMovies = () => {
    const { username } = userSession.loadUserData()
    history.push(`/${username}/movies`)
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">>
        <Navbar.Brand onClick={goHome} style={{ cursor: 'pointer'}}>
          TV Locker
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {
              userSession.isUserSignedIn() ?
              <>
                <Button onClick={goToMyMovies} variant="link">My TV Shows</Button>
                <Button onClick={handleSignOut} variant="link">Sign Out</Button>
              </> :
              <Button onClick={handleSignIn} variant="link">Sign In</Button>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <Container style={{ marginTop: '3em' }}>
        {
          userSession.isUserSignedIn() ?
          <Home userSession={userSession} /> :
          <Card className="text-center">
            <Card.Header>Welcome to MovieList</Card.Header>
            <Card.Body>
              <Card.Title>Sign in to access the MovieList Directory!</Card.Title>
              <Card.Text>
                MovieList is powered by Blockstack, a new internet for decentralized apps.
              </Card.Text>
              <Button onClick={handleSignIn} variant="primary">Sign In with Blockstack</Button>
            </Card.Body>
          </Card>
        }
      </Container>
    </div>
  );
}

export default withRouter(App);
