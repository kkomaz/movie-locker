import React, { useState } from 'react'
import { Button, Card, Form, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios'

function MoviePage(props) {
  const [inputText, setInputText] = useState('')
  const [tvList, setTvList] = useState([])
  const [show, setShow] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const tvShows = await axios.get(`http://api.tvmaze.com/search/shows?q=${inputText}`)
      setTvList(tvShows.data)
    } catch (e) {
      setShow(true)
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  return (
    <>
      {
        show &&
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        </Alert>
      }

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
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default MoviePage
