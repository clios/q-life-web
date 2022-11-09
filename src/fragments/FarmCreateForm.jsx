// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import address from '../address.json'
import spring from '../spring'
import route from '../route'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Select, Loader } from 'shirakami-ui'

// Make a Fragment by creating a functional component.
export default function FarmCreateForm(props) {
  // Destructure all the props.
  const { beneficiary, loading } = props

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    beneficiary: {
      id: beneficiary?.id,
      name: beneficiary?.name
    }
  }

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    beneficiaryId: function () {
      return raw.beneficiary.id
    },
    name: function () {
      return raw.beneficiary.name || 'N/A'
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
      return ''
    },
    barangayList: function () {
      return []
    },
    barangay: function () {
      return ''
    }
  }

  // Initialize the states needed to render.
  const beneficiaryId = dv.beneficiaryId()
  const name = dv.name()
  const [region, setRegion] = React.useState(dv.region())
  const regionList = dv.regionList()
  const [province, setProvince] = React.useState(dv.province())
  const [provinceList, setProvinceList] = React.useState(dv.provinceList())
  const [municipalList, setMunicipalList] = React.useState(dv.municipalList())
  const [municipal, setMunicipal] = React.useState(dv.municipal())
  const [barangayList, setBarangayList] = React.useState(dv.barangayList())
  const [barangay, setBarangay] = React.useState(dv.barangay())

  // Functions for receiving user data inputs.
  function selectRegion(e) {
    setRegion(e.target.value)
    setProvinceList(Object.keys(address[e.target.value].province_list))
    setProvince('')
    setMunicipalList([])
    setMunicipal('')
    setBarangayList([])
    setBarangay('')
  }
  function selectProvince(e) {
    setProvince(e.target.value)
    setMunicipalList(() => {
      if (e.target.value === '') return []
      let p = address[region].province_list[e.target.value]
      return Object.keys(p.municipality_list)
    })
    setMunicipal('')
    setBarangayList([])
    setBarangay('')
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

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      beneficiary_id: function () {
        return raw.beneficiary.id
      },
      region: function () {
        return region
      },
      province: function () {
        return province
      },
      municipal: function () {
        return municipal
      },
      barangay: function () {
        return barangay
      }
    }

    // Create request body by combining the
    // request fields into a single object.
    let request_body = {
      beneficiary_id: request_field.beneficiary_id(),
      region: request_field.region(),
      province: request_field.province(),
      municipal: request_field.municipal(),
      barangay: request_field.barangay(),
      harvests_dry: 0,
      harvests_fresh: 0,
      harvests_gcb: 0
    }

    // Send submit form event to screen.
    props.onSubmitForm(request_body)
  }

  // Return components to be rendered.
  return (
    <div>
      {loading && <Loader />}
      <Breadcrumbs>
        <small onClick={() => route.to.Beneficiaries()}>
          Registered Beneficiaries
        </small>
        <small onClick={() => route.to.Beneficiary(beneficiaryId)}>
          {name}
        </small>
        <small>Create Farm</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Farm Create Form</h1>
        <p>
          By editing this form, this beneficiary farm information can be
          created.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <Form onSubmit={submitForm}>
          <Field>
            <h2>Farm Information</h2>
          </Field>
          <Form.Row>
            <Field label="Region" required>
              <Select onChange={selectRegion} value={region} required disabled>
                {regionList.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Field>
            <Field label="Province" required>
              <Select
                onChange={selectProvince}
                value={province}
                required
                disabled>
                <Select.Option value=""></Select.Option>
                {provinceList.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Field>
            <Field label="Municipal" required>
              <Select onChange={selectMunicipal} value={municipal} required>
                <Select.Option value=""></Select.Option>
                {municipalList.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Field>
            <Field label="Barangay" required>
              <Select onChange={selectBarangay} value={barangay} required>
                <Select.Option value=""></Select.Option>
                {barangayList.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Field>
          </Form.Row>
          <Form.Footer>
            <Button disabled={loading} type="submit">
              Create farm
            </Button>
            <Button
              onClick={() => route.to.Beneficiary(beneficiaryId)}
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
