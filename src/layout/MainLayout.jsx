// MainLayout is responsible for customizing the
// main navigation and main content of the web app.

// Local dependencies
import Navigation from './Navigation'
import Content from './Content'
import spring from '../spring'
import route from '../route'
import GetYourAccount from '../api/GetYourAccount'

// External dependencies
import React from 'react'
import { useSpring, animated } from 'react-spring'

function MainLayout({ children }) {
  // Check for authentication
  const resYourAccount = GetYourAccount()
  const token = localStorage.getItem('token')
  React.useEffect(() => {
    if (!token && resYourAccount?.error?.status === 403) {
      route.to.SignIn()
    }
    if (resYourAccount?.data?.inactive) {
      route.to.SignIn()
    }
  }, [resYourAccount])

  return token ? (
    <animated.div style={useSpring(spring.fadeIn)}>
      <Navigation account={JSON.parse(localStorage.getItem('me'))} />
      <Content>{children}</Content>
    </animated.div>
  ) : (
    <div></div>
  )
}

export default MainLayout
