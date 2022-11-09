// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import './SignInForm.css'
import spring from '../spring'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Input } from 'shirakami-ui'
import { Loader } from 'shirakami-ui'

// Make a Fragment by creating a functional component.
export default function SignInForm(props) {
  // Destructure all the props.
  const { loading } = props

  // Initialize the states needed to render.
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [msg_password, setMsgPassword] = React.useState('')

  // Functions for receiving user data inputs.
  function enterEmail(e) {
    setEmail(e.target.value)
  }
  function enterPassword(e) {
    setPassword(e.target.value)
  }

  // Functions to check if caps lock is on.
  function detectCapsLock(event) {
    setMsgPassword(() => {
      const capsLockOn = event.getModifierState('CapsLock')
      if (!capsLockOn) return ''
      return 'Caps Lock is on'
    })
  }

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      email: function () {
        return email
      },
      password: function () {
        return password
      }
    }

    // Create request body by combining the
    // request fields into a single object.
    let request_body = {
      email: request_field.email(),
      password: request_field.password()
    }

    // Send submit form event to screen.
    props.onSubmitForm(request_body)
  }

  // Return components to be rendered.
  return (
    <animated.div className="sign-in-form" style={useSpring(spring.fadeIn)}>
      {loading && <Loader />}
      <Form onSubmit={submitForm}>
        <h1 className="sign-in-title">Q-LiFE UEP</h1>
        <Field label="Management Information System" />
        <Field label="Email">
          <Input
            onChange={enterEmail}
            value={email}
            type="email"
            autoComplete="off"
            required
          />
        </Field>
        <Field label="Password" message={msg_password}>
          <Input
            onChange={enterPassword}
            value={password}
            onKeyUp={detectCapsLock}
            type="password"
            required
          />
        </Field>
        <Button disabled={loading} className="sign-in-button" type="submit">
          Sign In
        </Button>
      </Form>
    </animated.div>
  )
}
