// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import './BeneficiariesTable.css'
import address from '../address.json'
import spring from '../spring'
import route from '../route'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'
import TitleWithIcon from '../components/TitleWithIcon'
import InformationRow from '../components/InformationRow'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Button, Input, Loader, Select } from 'shirakami-ui'
import { Field, Table } from 'shirakami-ui'
import dayjs from 'dayjs'

// Make a Fragment by creating a functional component.
export default function BeneficiariesTable(props) {
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
      name: queryParams.name,
      municipal: queryParams.municipal,
      barangay: queryParams.barangay,
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
    name: function () {
      return raw.queryParams.name
    },
    regionList: function () {
      return Object.keys(address).sort()
    },
    region: function () {
      return '02'
    },
    provinceList: function () {
      return Object.keys(address[dv.region()].province_list)
    },
    province: function () {
      return 'QUIRINO'
    },
    municipalList: function () {
      let pList = address[dv.region()].province_list[dv.province()]
      let mList = pList.municipality_list
      return Object.keys(mList)
    },
    municipal: function () {
      return raw.queryParams.municipal
    },
    barangayList: function () {
      return []
    },
    barangay: function () {
      return raw.queryParams.barangay
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
  const [name, setName] = React.useState(dv.name())
  const region = dv.region()
  const province = dv.province()
  const municipalList = dv.municipalList()
  const [municipal, setMunicipal] = React.useState(dv.municipal())
  const [barangayList, setBarangayList] = React.useState(dv.barangayList())
  const [barangay, setBarangay] = React.useState(dv.barangay())
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
  function enterName(e) {
    setName(e.target.value)
  }
  function selectMunicipal(e) {
    setMunicipal(e.target.value)
    setBarangayList(() => {
      if (e.target.value === '') return []
      let p = address[region].province_list[province]
      return p.municipality_list[e.target.value].barangay_list
    })
    setBarangay('')
  }
  function selectBarangay(e) {
    setBarangay(e.target.value)
  }
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
      name: name,
      municipal: municipal,
      barangay: barangay,
      sortBy: sortBy,
      direction: direction
    }
  }

  // Functions to update query params in the
  // Screen component
  function filterTable() {
    let queryParams = getQueryParams()
    props.onNewQueryParams(queryParams)
  }
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
        <small>Registered Beneficiaries</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <TitleWithIcon>
            <h1>Table of Registered Beneficiaries</h1>
            <Button
              onClick={() => route.to.BeneficiaryCreate()}
              variant="icon"
              icon="plus"
            />
          </TitleWithIcon>
          <p>
            List of {total} farmers registered as beneficiaries of Q-LiFE UEP.
          </p>
        </ScreenTitle>
      </animated.div>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <InformationRow>
          <Field label="Name">
            <Input onChange={enterName} value={name} size="15" />
          </Field>
          <Field label="Municipal">
            <Select onChange={selectMunicipal} value={municipal} required>
              <Select.Option value="">All municipal</Select.Option>
              {municipalList.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Field>
          <Field label="Barangay">
            <Select onChange={selectBarangay} value={barangay} required>
              <Select.Option value="">All barangay</Select.Option>
              {barangayList.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Field>
          <Button
            onClick={() => filterTable()}
            className="beneficiary-search-button"
            variant="outline">
            Search
          </Button>
        </InformationRow>
        <InformationRow>
          <Field className="beneficiary-sort-by" label="Sort by">
            <Select onChange={selectSortBy} value={sortBy}>
              <Select.Option value="name">Name</Select.Option>
              <Select.Option value="updated_at">Last update</Select.Option>
            </Select>
          </Field>
          <Field className="beneficiary-sort-direction" label="Direction">
            <Select onChange={selectDirection} value={direction}>
              <Select.Option value="asc">Ascending</Select.Option>
              <Select.Option value="desc">Descending</Select.Option>
            </Select>
          </Field>
          <Button
            onClick={() => sortTable()}
            className="beneficiary-sort-button"
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
            Total beneficiaries in the table: {total}
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
