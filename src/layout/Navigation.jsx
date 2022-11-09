// Navigation contains a sidebar
// that helps the user to switch routes

// Local dependencies
import './Navigation.css'
import useEnv from '../hooks/useEnv'
import SignOut from './SignOut'
import route from '../route'
import RBAC from '../components/RBAC'
import policy from '../policy'

// External dependencies
import React from 'react'
import { Sidebar } from 'shirakami-ui'
import { Link } from '@reach/router'

function Navigation(props) {
  // Desturcture the props
  const { account } = props

  // Reference, redefine the key and
  // values ​​of props in a single object
  const ref = {
    account: {
      name: account?.name,
      email: account?.email,
      role: account?.role,
      inactive: account?.inactive,
      created_at: account?.created_at,
      updated_at: account?.updated_at
    }
  }

  // Default values, an object that will provide
  // the first content of the fragment data model
  const dv = {
    name: function () {
      if (!account) return 'N/A'
      return ref.account.name
    },
    role: function () {
      if (!account) return 'N/A'
      if (ref.account.role === 'admin') return 'System Administrator'
      if (ref.account.role === 'clerk') return 'Database Controller'
      if (ref.account.role === 'aide') return 'Administrative Aide'
    }
  }

  // Data model, information to be displayed and
  // used in the works of the fragment
  const name = dv.name()
  const role = dv.role()

  // Get the environment variables needed
  const { APP_TITLE, APP_VERSION } = useEnv()

  // Highlight the active sidebar link
  function markActiveLink({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: 'active' } : { className: '' }
  }

  return (
    <Sidebar>
      <small className="app-title">
        {APP_TITLE} {APP_VERSION}
      </small>
      <Sidebar.Menu>
        <Link getProps={markActiveLink} to={route.path.YourAccount}>
          <h1 className="your-account-name">{name}</h1>
          <small>{role}</small>
        </Link>
      </Sidebar.Menu>
      <Sidebar.Menu label="Management">
        <Link getProps={markActiveLink} to={route.path.PlantationDashboard}>
          Plantation Dashboard
        </Link>
        <Link getProps={markActiveLink} to={route.path.PlantationLocation}>
          Plantation Location
        </Link>
        <Link getProps={markActiveLink} to={route.path.SuggestedReplantation}>
          Replantation
        </Link>
        <Link getProps={markActiveLink} to={route.path.Beneficiaries}>
          Beneficiaries
        </Link>
      </Sidebar.Menu>
      <Sidebar.Menu label="System">
        <RBAC allowedRoles={policy.component.sidebar_user}>
          <Link getProps={markActiveLink} to={route.path.Users}>
            User's Accounts
          </Link>
        </RBAC>
        <Link getProps={markActiveLink} to={route.path.TermsConditions}>
          Terms and Conditions
        </Link>
        <Link getProps={markActiveLink} to={route.path.PrivacyPolicies}>
          Privacy Policies
        </Link>
        <SignOut />
      </Sidebar.Menu>
    </Sidebar>
  )
}

export default Navigation
