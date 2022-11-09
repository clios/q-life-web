// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import './YourAccountInfo.css'
import spring from '../spring'
import route from '../route'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import TitleWithIcon from '../components/TitleWithIcon'
import InformationRow from '../components/InformationRow'
import BlueLink from '../components/BlueLink'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Field, Button } from 'shirakami-ui'
import dayjs from 'dayjs'

// Make a Fragment by creating a functional component.
export default function YourAccountInfo(props) {
  // Destructure all the props.
  const { account } = props

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    account: {
      name: account?.name,
      email: account?.email,
      role: account?.role,
      created_at: account?.created_at,
      updated_at: account?.updated_at
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    firstName: function () {
      if (!account) return 'N/A'
      return raw.account.name?.split(' ')[0].toLowerCase()
    },
    name: function () {
      if (!account) return 'N/A'
      return raw.account.name?.toUpperCase()
    },
    email: function () {
      if (!account) return 'N/A'
      return raw.account.email
    },
    role: function () {
      if (!account) return 'N/A'
      if (raw.account.role === 'admin') return 'SYSTEM ADMINISTRATOR'
      if (raw.account.role === 'clerk') return 'DATABASE CONTROLLER'
      if (raw.account.role === 'aide') return 'ADMINISTRATIVE AIDE'
    },
    responsibility: function () {
      if (!account) return 'N/A'
      if (raw.account.role === 'admin') {
        return (
          'This account will only be used by developers to ' +
          'maintain system functionality.'
        )
      }
      if (raw.account.role === 'clerk') {
        return (
          "Responsible for managing end user's account and" +
          ' lead the management of information such as: beneficiaries' +
          ', farms, plantations, pests and diseases, and harvests.'
        )
      }
      if (raw.account.role === 'aide') {
        return (
          'Responsible for assisting the Database Controller' +
          ' in managing information about: beneficiaries, farms,' +
          ' plantations, pests and diseases, and harvests. They' +
          " are not authorized to manage end user's accounts."
        )
      }
    },
    updatedAt: function () {
      if (!account) return 'N/A'
      return dayjs(raw.account.updated_at).format('MMMM DD, YYYY hh:mm A')
    }
  }

  // Initialize the states needed to render.
  const firstName = dv.firstName()
  const name = dv.name()
  const email = dv.email()
  const role = dv.role()
  const responsibility = dv.responsibility()
  const updatedAt = dv.updatedAt()

  // Return components to be rendered.
  return (
    <animated.div style={useSpring(spring.fadeIn)}>
      <Breadcrumbs>
        <small>Your Account</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <h1>{name}</h1>
          <p>
            Howdy <span className="account-first-name">{firstName}</span>, this
            is your account information. Last updated on {updatedAt}.
          </p>
        </ScreenTitle>
      </animated.div>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <TitleWithIcon>
          <h2>Account Information</h2>
          <Button
            onClick={() => route.to.YourAccountUpdate()}
            variant="icon"
            icon="edit"
          />
        </TitleWithIcon>
        <InformationRow>
          <Field label="Name">{name}</Field>
          <Field label="Email">{email}</Field>
          <Field label="Role">{role}</Field>
          <Field label="Responsibility">{responsibility}</Field>
        </InformationRow>
        <Field label="Terms and Conditions">
          You have read, understood and agreed to abide by what is written in
          the <BlueLink to="terms-conditions">Terms and Conditions</BlueLink>.
        </Field>
        <Field label="Data Privacy Consent">
          You gave permission for the system to use your information in
          accordance with the Data Privacy Act of 2012. For more information,
          you can read the{' '}
          <BlueLink to="privacy-policies">Privacy Policies</BlueLink> of Q-LiFE
          UEP MIS.
        </Field>
      </animated.div>
    </animated.div>
  )
}
