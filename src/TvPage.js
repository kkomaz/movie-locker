import React, { useState } from 'react'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import { TV_PATH } from 'utils/constants'
import axios from 'axios'
import _ from 'lodash'
import UserTvSearch from './UserTvSearch'

function TvPage(props) {
  const { userSession, userTvList, setUserTvList } = props

  const [inputText, setInputText] = useState('')
  const [tvList, setTvList] = useState([])
  const userTvIds = _.map(userTvList, 'id')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const tvShows = await axios.get(`http://api.tvmaze.com/search/shows?q=${inputText}`)
      setTvList(tvShows.data)
    } catch (e) {
      alert(e.message)
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

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
      <UserTvSearch />

      <Card>
        <Card.Header>TV Show Search</Card.Header>
        <Card.Text style={{ padding: '20px' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="tv-search">
              <Form.Label>TV Show Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter TV Show"
                onChange={handleChange}
                value={inputText}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Card.Text>
      </Card>

      <Row style={{ marginTop: '2em' }}>
        {
          tvList.map((tv) => (
            <Col xs={4} style={{ marginBottom: '1em' }}>
              <Card>
                <Card.Img variant="top" src={tv.show.image.medium} />
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>
                    {tv.show.name}
                  </Card.Title>
                  <Card.Text style={{ textAlign: 'center' }}>
                    {
                      _.includes(userTvIds, tv.show.id) ?
                      <Button
                        variant="danger"
                        onClick={() => removeFromStorage(tv.show)}
                      >
                        Remove
                      </Button> :
                      <Button
                        variant="secondary"
                        onClick={() => saveToStorage(tv.show)}
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

export default TvPage
