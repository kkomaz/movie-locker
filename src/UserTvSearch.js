import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

function UserTvSearch(props) {
  const [inputText, setInputText] = useState('')
  const { history } = props

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    history.push(`/${inputText}/movies`)
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '50%' }}>
      <Form.Group controlId="user-tv-search">
        <Form.Control
          type="text"
          placeholder="Search User TV Shows"
          onChange={handleChange}
          value={inputText}
        />
      </Form.Group>
    </Form>
  )
}

export default withRouter(UserTvSearch)
