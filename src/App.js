import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { appConfig } from 'utils/constants'
import { Container, Navbar, Button, Card } from 'react-bootstrap'
import { UserSession } from 'blockstack'
import Home from './Home'

function App() {
  const [userSession] = useState(new UserSession({ appConfig }))

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

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">>
        <Navbar.Brand>TV Locker</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {
              userSession.isUserSignedIn() ?
              <Button onClick={handleSignOut} variant="link">Sign Out</Button> :
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

export default App;
