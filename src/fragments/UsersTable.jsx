// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import spring from '../spring'
import route from '../route'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import TitleWithIcon from '../components/TitleWithIcon'
import InformationRow from '../components/InformationRow'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Button, Loader, Table } from 'shirakami-ui'

// Make a Fragment by creating a functional component.
export default function UsersTable(props) {
  // Destructure all the props.
  const { usersData, queryParams } = props

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    usersData: {
      total: usersData?.total,
      users: usersData?.users
    },
    queryParams: {
      limit: queryParams.limit,
      page: queryParams.page
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    total: function () {
      return raw.usersData.total || 0
    },
    users: function () {
      return raw.usersData.users || []
    },
    limit: function () {
      return raw.queryParams.limit
    },
    page: function () {
      return raw.queryParams.page
    }
  }

  // Initialize the states needed to render.
  const total = dv.total()
  const users = dv.users()
  const limit = dv.limit()
  const [page, setPage] = React.useState(dv.page())

  // Apply UI logics for states that needs
  // modification by creating functions inside
  // an object.
  const mod = {
    role: function (role) {
      if (role === 'admin') return 'SYSTEM ADMINISTRATOR'
      if (role === 'clerk') return 'DATABASE CONTROLLER'
      if (role === 'aide') return 'ADMINISTRATIVE AIDE'
    },
    status: function (inactive) {
      return inactive ? 'INACTIVE' : 'ACTIVE'
    }
  }

  // Create a function that returns an object
  // that contains the values of query params.
  function getQueryParams() {
    return { limit: limit, page: page }
  }

  // Increase page value by 1.
  function nextPage() {
    setPage((prevState) => prevState + 1)
  }

  // Decrease page value by 1.
  function prevPage() {
    setPage((prevState) => prevState - 1)
  }

  // Callback function for pagination.
  const isFirstRun = React.useRef(true)
  React.useEffect(() => {
    // Skip this effect on first render.
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    // Send new query params.
    props.onNewQueryParams(getQueryParams())
  }, [page])

  // Return components to be rendered.
  return (
    <animated.div style={useSpring(spring.fadeIn)}>
      {usersData == undefined && <Loader />}
      <Breadcrumbs>
        <small>User's Accounts</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <TitleWithIcon>
            <h1>Table of User's Accounts</h1>
            <Button
              onClick={() => route.to.UserCreate()}
              variant="icon"
              icon="plus"
            />
          </TitleWithIcon>
          <p>List of user accounts with and without access to the system.</p>
        </ScreenTitle>
      </animated.div>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <Table
          headerCells={[
            { name: 'Name' },
            { name: 'Email' },
            { name: 'Role' },
            { name: 'Status' }
          ]}>
          {users.map((i) => (
            <Table.Row key={i.id} onClick={() => route.to.User(i.id)}>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.email}</Table.Cell>
              <Table.Cell>{mod.role(i.role)}</Table.Cell>
              <Table.Cell>{mod.status(i.inactive)}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <InformationRow>
          <small className="table-helper">
            Total users in the table: {total}
          </small>
          <Button
            onClick={() => prevPage()}
            disabled={page <= 1}
            className="table-prev"
            variant="icon"
            icon="chevron-left"
          />
          <small className="table-helper">
            Page {page} of {Math.ceil(total / limit)}
          </small>
          <Button
            onClick={() => nextPage()}
            disabled={page >= Math.ceil(total / limit)}
            className="table-next"
            variant="icon"
            icon="chevron-right"
          />
        </InformationRow>
      </animated.div>
    </animated.div>
  )
}
