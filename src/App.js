import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { appConfig } from 'utils/constants'
import './App.scss';
import { Container, Navbar, Button } from 'react-bootstrap'
import { UserSession } from 'blockstack'

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
      <Navbar>
        <Navbar.Brand>Movie Locker</Navbar.Brand>
        <Navbar.Toggle />
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
      <Container>
        {
          userSession.isUserSignedIn() ?
          <div>Is Signed In</div> :
          <div>Is Not Signed In</div>
        }
      </Container>
    </div>
  );
}

export default App;
