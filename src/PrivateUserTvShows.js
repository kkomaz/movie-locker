import React from 'react'
import { TV_PATH } from 'utils/constants'
import { Row, Col, Card, Button } from 'react-bootstrap'
import _ from 'lodash'

function PrivateUserTvShows(props) {
  const { userTvList, userSession, setUserTvList, username } = props
  const userTvIds = _.map(userTvList, 'id')

  const saveToStorage = async (show) => {
    const options = { encrypt: false }
    
    try {
      const newTvList = [...userTvList, show]
      await userSession.putFile(TV_PATH, JSON.stringify(newTvList), options)
      setUserTvList(newTvList)
      alert(`${show.name} successfully added to your library`)
    } catch (e) {
      alert(e.message);
    }
  }


  const removeFromStorage = async (show) => {
    const options = { encrypt: false }

    try {
      const newTvList = _.filter(userTvList, (tv) => (
        tv.id !== show.id
      ));

      await userSession.putFile(TV_PATH, JSON.stringify(newTvList), options)
      alert(`${show.name} successfully removed to your library`)
      setUserTvList(newTvList)
    } catch (e) {
      alert(e.message)
    }
  }


  return (
    <>
      <h2>{username}'s SAVED shows</h2>
      <Row style={{ marginTop: '2em' }}>
        {
          userTvList.map((tv) => (
            <Col xs={4} style={{ marginBottom: '1em' }}>
              <Card>
                <Card.Img variant="top" src={tv.image.medium} />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>
                    {tv.name}
                  </Card.Title>
                  <Card.Text style={{ textAlign: 'center' }}>
                    {
                      _.includes(userTvIds, tv.id) ?
                      <Button
                        variant="danger"
                        onClick={() => removeFromStorage(tv)}
                      >
                        Remove
                      </Button> :
                      <Button
                        variant="secondary"
                        onClick={() => saveToStorage(tv)}
                      >
                        Save
                      </Button>
                    }
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default PrivateUserTvShows