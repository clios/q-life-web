// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import spring from '../spring'
import route from '../route'
import snackbar from '../snackbar'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import BlueLink from '../components/BlueLink'

// Import the external dependencies needed.
import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Checkbox, Input, Loader } from 'shirakami-ui'

// Make a Fragment by creating a functional component.
export default function YourAccountUpdateForm(props) {
  // Destructure all the props.
  const { account, loading } = props

  // Configure the snackbar.
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    account: {
      id: account?.id,
      name: account?.name,
      email: account?.email,
      role: account?.role,
      inactive: account?.inactive,
      created_at: account?.created_at,
      updated_at: account?.updated_at
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    name: function () {
      return raw.account.name?.toUpperCase()
    },
    email: function () {
      return raw.account.email
    }
  }

  // Initialize the states needed to render.
  const [name, setName] = React.useState(dv.name())
  const [email, setEmail] = React.useState(dv.email())
  const [password, setPassword] = React.useState('')
  const [confirm_password, setConfirmPassword] = React.useState('')
  const [privacy_consent, setPrivacyConsent] = React.useState(false)
  const [terms_conditions, setTermsConditions] = React.useState(false)
  const [msg_password, setMsgPassword] = React.useState('')
  const [msg_confirm_password, setMsgConfirmPassword] = React.useState('')

  // Functions for receiving user data inputs.
  function enterName(e) {
    setName(e.target.value)
  }
  function enterEmail(e) {
    setEmail(e.target.value)
  }
  function enterPassword(e) {
    setPassword(e.target.value)
    setConfirmPassword('')
  }
  function enterConfirmPassword(e) {
    setConfirmPassword(e.target.value)
    if (password === e.target.value) {
      infoSnackbar('Password matched')
    }
  }
  function tickPrivacyConsent(e) {
    setPrivacyConsent(e.target.checked)
  }
  function ticktTermsConditions(e) {
    setTermsConditions(e.target.checked)
  }

  // Functions to check if caps lock is on.
  function detectPasswordCapsLock(event) {
    setMsgPassword(() => {
      let capsLockOn = event.getModifierState('CapsLock')
      if (!capsLockOn) return ''
      return 'Caps Lock is on'
    })
  }
  function detectConfirmPasswordCapsLock(event) {
    setMsgConfirmPassword(() => {
      let capsLockOn = event.getModifierState('CapsLock')
      if (!capsLockOn) return ''
      return 'Caps Lock is on'
    })
  }

  // Transmutation for API PATCH request
  function transmutation() {
    let mutation = {
      name: function () {
        return name?.toUpperCase()
      },
      email: function () {
        return email
      },
      password: function () {
        return password
      }
    }

    let mutated = {
      name: mutation.name(),
      email: mutation.email(),
      password: mutation.password()
    }

    // Filter same key and value
    if (mutated.name === raw.account.name) delete mutated.name
    if (mutated.email === raw.account.email) delete mutated.email
    if (mutated.password === '') delete mutated.password

    return mutated
  }

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      name: function () {
        return name?.toUpperCase()
      },
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
      name: request_field.name(),
      email: request_field.email(),
      password: request_field.password()
    }

    // Filter out the fields of request body
    // with the same value in props raw state.
    if (request_body.name === raw.account.name) delete request_body.name
    if (request_body.email === raw.account.email) delete request_body.email
    if (request_body.password === '') delete request_body.password

    // Verify if there is an update.
    if (JSON.stringify(request_body) === JSON.stringify({})) {
      infoSnackbar('No changes made')
      return
    }

    // Verify if password is confirmed.
    if (password !== confirm_password) {
      setPassword('')
      setConfirmPassword('')
      errorSnackbar('Password mismatch')
      return
    }

    // Send submit form event to screen.
    props.onSubmitForm(request_body)
  }

  // Return components to be rendered.
  return (
    <div>
      {loading && <Loader />}
      <Breadcrumbs>
        <small onClick={() => route.to.YourAccount()}>Your Account</small>
        <small>Update</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Update Your Account</h1>
        <p>
          By editing this form, your account can be updated. Fields with{' '}
          <span className="sk-field-required">*</span> are required.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <h2>Account Information</h2>
        <Field label="Please read the following:">
          <BlueLink to="privacy-policies">Privacy Policies</BlueLink> and{' '}
          <BlueLink to="terms-conditions">Terms and Conditions</BlueLink>
        </Field>
        <Form onSubmit={submitForm}>
          <Form.Row>
            <Field label="Name" required>
              <Input onChange={enterName} value={name} />
            </Field>
            <Field label="Email" required>
              <Input onChange={enterEmail} value={email} />
            </Field>
          </Form.Row>
          <Form.Row>
            <Field label="Password" message={msg_password}>
              <Input
                onChange={enterPassword}
                onKeyUp={detectPasswordCapsLock}
                value={password}
                type="password"
                minLength="8"
                maxLength="255"
              />
            </Field>
            <Field
              label="Confirm Password"
              message={msg_confirm_password}
              required={password ? true : false}>
              <Input
                onChange={enterConfirmPassword}
                onKeyUp={detectConfirmPasswordCapsLock}
                value={confirm_password}
                required={password ? true : false}
                type="password"
                minLength="8"
                maxLength="255"
              />
            </Field>
          </Form.Row>
          <Form.Row>
            <Field label="Data Privacy Consent" required>
              <Checkbox onChange={tickPrivacyConsent} value={privacy_consent}>
                I give permission
              </Checkbox>
            </Field>
            <Field label="Terms and Conditions" required>
              <Checkbox
                onChange={ticktTermsConditions}
                value={terms_conditions}>
                I agree
              </Checkbox>
            </Field>
          </Form.Row>
          <Form.Footer>
            <Button
              type="submit"
              disabled={
                privacy_consent && terms_conditions && !loading ? false : true
              }>
              Update my account
            </Button>
            <Button
              onClick={() => route.to.YourAccount()}
              type="button"
              variant="outline">
              Cancel
            </Button>
          </Form.Footer>
        </Form>
      </animated.div>
    </div>
  )
}
