import React, { useEffect, useState } from 'react'
import { TV_PATH } from 'utils/constants'
import { Row, Col, Card } from 'react-bootstrap'

function PublicUserTvShows(props) {
  const { username, userSession } = props
  const [tvList, setTvList] = useState([])

  useEffect(() => {
    const fetchTvShows = async () => {
      const options = { decrypt: false, username }
      const result = await userSession.getFile(TV_PATH, options)
      setTvList(JSON.parse(result))
    }

    fetchTvShows()
  }, [])

  return (
    <>
      <h2>{username}'s SAVED shows</h2>
      <Row style={{ marginTop: '2em' }}>
        {
          tvList.map((tv) => (
            <Col xs={4} style={{ marginBottom: '1em' }}>
              <Card>
                <Card.Img variant="top" src={tv.image.medium} />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>
                    {tv.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default PublicUserTvShows