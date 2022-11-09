// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import './SuggestedReplantationTable.css'
import spring from '../spring'
import route from '../route'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import InformationRow from '../components/InformationRow'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Button, Loader, Select } from 'shirakami-ui'
import { Field, Table } from 'shirakami-ui'
import dayjs from 'dayjs'

// Make a Fragment by creating a functional component.
export default function SuggestedReplantationTable(props) {
  // Destructure all the props.
  const { beneficiariesData, queryParams } = props

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    beneficiariesData: {
      total: beneficiariesData?.total,
      beneficiaries: beneficiariesData?.beneficiaries
    },
    queryParams: {
      limit: queryParams.limit,
      page: queryParams.page,
      sortBy: queryParams.sortBy,
      direction: queryParams.direction
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    total: function () {
      return raw.beneficiariesData.total || 0
    },
    beneficiaries: function () {
      return raw.beneficiariesData.beneficiaries || []
    },
    sortBy: function () {
      return raw.queryParams.sortBy
    },
    direction: function () {
      return raw.queryParams.direction
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
  const beneficiaries = dv.beneficiaries()
  const [sortBy, setSortBy] = React.useState(dv.sortBy())
  const [direction, setDirection] = React.useState(dv.direction())
  const limit = dv.limit()
  const [page, setPage] = React.useState(dv.page())

  // Apply UI logics for states that needs
  // modification by creating functions inside
  // an object.
  const mod = {
    updatedAt: function (date) {
      return dayjs(date).format('MMMM DD, YYYY hh:mm A')
    }
  }

  // Functions for receiving user data inputs.
  function selectSortBy(e) {
    setSortBy(e.target.value)
  }
  function selectDirection(e) {
    setDirection(e.target.value)
  }

  // Create a function that returns an object
  // that contains the values of query params.
  function getQueryParams() {
    return {
      limit: limit,
      page: page,
      sortBy: sortBy,
      direction: direction
    }
  }

  // Functions to update query params in the
  // Screen component
  function sortTable() {
    let queryParams = getQueryParams()
    props.onNewQueryParams(queryParams)
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
      {beneficiariesData == undefined && <Loader />}
      <Breadcrumbs>
        <small>Suggested Replantation</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <h1>Table of Suggested Replantation</h1>
          <p>
            Here is the list of beneficiaries in need of replantation due to 75%
            below surviving seedlings. The information below is based on current
            records in the system.
          </p>
        </ScreenTitle>
      </animated.div>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <InformationRow>
          <Field className="replantation-sort-by" label="Sort by">
            <Select onChange={selectSortBy} value={sortBy}>
              <Select.Option value="name">Name</Select.Option>
              <Select.Option value="updated_at">Last update</Select.Option>
            </Select>
          </Field>
          <Field className="replantation-sort-direction" label="Direction">
            <Select onChange={selectDirection} value={direction}>
              <Select.Option value="asc">Ascending</Select.Option>
              <Select.Option value="desc">Descending</Select.Option>
            </Select>
          </Field>
          <Button
            onClick={() => sortTable()}
            className="replantation-sort-button"
            variant="outline">
            Sort
          </Button>
        </InformationRow>
        <Table
          headerCells={[
            { name: 'Name' },
            { name: 'Barangay' },
            { name: 'Municipal' },
            { name: 'Last Update' }
          ]}>
          {beneficiaries.map((i) => (
            <Table.Row key={i.id} onClick={() => route.to.Beneficiary(i.id)}>
              <Table.Cell>{i.name}</Table.Cell>
              <Table.Cell>{i.barangay}</Table.Cell>
              <Table.Cell>{i.municipal}</Table.Cell>
              <Table.Cell>{mod.updatedAt(i.updated_at)}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <InformationRow>
          <small className="table-helper">
            Total suggested replantation: {total}
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
