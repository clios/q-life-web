// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import './UserCreateForm.css'
import spring from '../spring'
import route from '../route'
import snackbar from '../snackbar'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import BlueLink from '../components/BlueLink'
import RolesAndResponsibilities from '../components/RolesAndResponsibilities'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Checkbox, Input, Loader, Select } from 'shirakami-ui'
import { useSnackbar } from 'react-simple-snackbar'

// Make a Fragment by creating a functional component.
export default function UserCreateForm(props) {
  // Destructure the props.
  const { loading } = props

  // Configure the snackbar.
  const [infoSnackbar] = useSnackbar(snackbar.info)
  const [errorSnackbar] = useSnackbar(snackbar.error)

  // Initialize the states needed to render.
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm_password, setConfirmPassword] = React.useState('')
  const [role, setRole] = React.useState('aide')
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
  function selectRole(e) {
    setRole(e.target.value)
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
      },
      role: function () {
        return role
      }
    }

    // Create request body by combining the
    // request fields into a single object.
    let request_body = {
      name: request_field.name(),
      email: request_field.email(),
      password: request_field.password(),
      role: request_field.role()
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
        <small onClick={() => route.to.Users()}>User's Accounts</small>
        <small>Registration</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>User Registration Form</h1>
        <p>
          By completing this form, you can register a user that can access the
          system. Fields with <span className="sk-field-required">*</span> are
          required.
        </p>
      </ScreenTitle>
      <animated.div
        className="user-registration-grid"
        style={useSpring(spring.delayFadeIn)}>
        <div>
          <h2>Account Information</h2>
          <Field label="Please read the following:">
            <BlueLink to="privacy-policies">Privacy Policies</BlueLink> and{' '}
            <BlueLink to="terms-conditions">Terms and Conditions</BlueLink>
          </Field>
          <Form onSubmit={submitForm}>
            <Form.Row>
              <Field label="Name" required>
                <Input onChange={enterName} value={name} required />
              </Field>
              <Field label="Email" required>
                <Input
                  onChange={enterEmail}
                  value={email}
                  type="email"
                  required
                />
              </Field>
            </Form.Row>
            <Form.Row>
              <Field label="Password" message={msg_password} required>
                <Input
                  onChange={enterPassword}
                  onKeyUp={detectPasswordCapsLock}
                  value={password}
                  type="password"
                  minLength="8"
                  maxLength="255"
                  required
                />
              </Field>
              <Field
                label="Confirm Password"
                message={msg_confirm_password}
                required>
                <Input
                  onChange={enterConfirmPassword}
                  onKeyUp={detectConfirmPasswordCapsLock}
                  value={confirm_password}
                  type="password"
                  minLength="8"
                  maxLength="255"
                  required
                />
              </Field>
            </Form.Row>
            <Form.Row>
              <Field label="Role">
                <Select onChange={selectRole} value={role}>
                  <Select.Option value="clerk">
                    Database Controller
                  </Select.Option>
                  <Select.Option value="aide">
                    Administrative Aide
                  </Select.Option>
                </Select>
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
                Create user
              </Button>
              <Button
                onClick={() => route.to.Users()}
                type="button"
                variant="outline">
                Cancel
              </Button>
            </Form.Footer>
          </Form>
        </div>
        <RolesAndResponsibilities />
      </animated.div>
    </div>
  )
}
