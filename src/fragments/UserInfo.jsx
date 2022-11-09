// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
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
import { Button, Field, Loader } from 'shirakami-ui'
import dayjs from 'dayjs'

// Make a Fragment by creating a functional component.
export default function UserInfo(props) {
  // Destructure all the props.
  const { user } = props

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      inactive: user?.inactive,
      created_at: user?.created_at,
      updated_at: user?.updated_at
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    name: function () {
      if (!raw.user.name) return 'N/A'
      return raw.user.name?.toUpperCase()
    },
    email: function () {
      if (!raw.user.email) return 'N/A'
      return raw.user.email
    },
    role: function () {
      if (!raw.user.role) return 'N/A'
      if (raw.user.role === 'admin') return 'SYSTEM ADMINISTRATOR'
      if (raw.user.role === 'clerk') return 'DATABASE CONTROLLER'
      if (raw.user.role === 'aide') return 'ADMINISTRATIVE AIDE'
    },
    responsibility: function () {
      if (!raw.user.role) return 'N/A'
      if (raw.user.role === 'admin') {
        return (
          'This account will only be used by developers to ' +
          'maintain system functionality.'
        )
      }
      if (raw.user.role === 'clerk') {
        return (
          "Responsible for managing end user's account and" +
          ' lead the management of information such as: beneficiaries' +
          ', farms, plantations, pests and diseases, and harvests.'
        )
      }
      if (raw.user.role === 'aide') {
        return (
          'Responsible for assisting the Database Controller' +
          ' in managing information about: beneficiaries, farms,' +
          ' plantations, pests and diseases, and harvests. They' +
          " are not authorized to manage end user's accounts."
        )
      }
    },
    inactive: function () {
      return raw.user.inactive ? 'INACTIVE' : 'ACTIVE'
    },
    updated_at: function () {
      if (!raw.user.updated_at) return 'N/A'
      return dayjs(raw.user.updated_at).format('MMMM DD, YYYY hh:mm A')
    }
  }

  // Initialize the states needed to render.
  const name = dv.name()
  const email = dv.email()
  const role = dv.role()
  const responsibility = dv.responsibility()
  const inactive = dv.inactive()
  const updated_at = dv.updated_at()

  // Send deactivate user event to screen.
  function deactivateUser() {
    props.onDeactivateUser()
  }

  // Send reactivate user event to screen.
  function reactivateUser() {
    props.onReactivateUser()
  }

  // Return components to be rendered.
  return (
    <div>
      {user == undefined && <Loader />}
      <Breadcrumbs>
        <small onClick={() => route.to.Users()}>User's Accounts</small>
        <small>{name}</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>{name}</h1>
        <p>A user of Q-LiFE UEP MIS. Last updated on {updated_at}.</p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <TitleWithIcon>
          <h2>Account Information</h2>
          <Button
            onClick={() => route.to.UserUpdate(raw.user.id)}
            variant="icon"
            icon="edit"
          />
        </TitleWithIcon>
        <InformationRow>
          <Field label="Name">{name}</Field>
        </InformationRow>
        <InformationRow>
          <Field label="Email">{email}</Field>
          <Field label="Role">{role}</Field>
          <Field label="Status">{inactive}</Field>
          <Field label="Responsibility">{responsibility}</Field>
        </InformationRow>
        <Field label="Terms and Conditions">
          This user has already read, understood and agreed to abide by what is
          written in the{' '}
          <BlueLink to="terms-conditions">Terms and Conditions</BlueLink>.
        </Field>
        <Field label="Data Privacy Consent">
          This user has given permission for the system to use your information
          in accordance with the Data Privacy Act of 2012. For more information,
          you can read the{' '}
          <BlueLink to="privacy-policies">Privacy Policies</BlueLink> of Q-LiFE
          UEP MIS.
        </Field>
        {raw.user.inactive ? (
          <Button onClick={reactivateUser} variant="outline">
            Reactivate account
          </Button>
        ) : (
          <Button onClick={deactivateUser} variant="outline">
            Deactivate account
          </Button>
        )}
      </animated.div>
    </div>
  )
}
