import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import axios from 'axios'

function MoviePage(props) {
  const [inputText, setInputText] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const tvShows = await axios.get(`http://api.tvmaze.com/search/shows?q=${inputText}`)
      console.log(tvShows);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  return (
    <>
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
    </>
  )
}

export default MoviePage
