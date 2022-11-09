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
import { Button, Checkbox, Input, Select } from 'shirakami-ui'
import { Loader } from 'shirakami-ui'
import dayjs from 'dayjs'

// Make a Fragment by creating a functional component.
export default function BeneficiaryCreateForm(props) {
  // Destructure all the props.
  const { loading } = props

  // Apply UI logics for default values by
  // creating functions inside an object.
  const dv = {
    name: function () {
      return ''
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
    },
    birthday: function () {
      return ''
    },
    civilStatus: function () {
      return 'married'
    },
    consent: function () {
      return false
    }
  }

  // Initialize the states needed to render.
  const [name, setName] = React.useState(dv.name())
  const [region, setRegion] = React.useState(dv.region())
  const [regionList, setRegionList] = React.useState(dv.regionList())
  const [province, setProvince] = React.useState(dv.province())
  const [provinceList, setProvinceList] = React.useState(dv.provinceList())
  const [municipalList, setMunicipalList] = React.useState(dv.municipalList())
  const [municipal, setMunicipal] = React.useState(dv.municipal())
  const [barangayList, setBarangayList] = React.useState(dv.barangayList())
  const [barangay, setBarangay] = React.useState(dv.barangay())
  const [birthday, setBirthday] = React.useState(dv.birthday())
  const [civilStatus, setCivilStatus] = React.useState(dv.civilStatus())
  const [consent, setConsent] = React.useState(dv.consent())

  // Functions for receiving user data inputs.
  function enterName(e) {
    setName(e.target.value)
  }
  function selectRegion(e) {
    setRegion(e.target.value)
    setProvinceList(() => {
      let pList = address[e.target.value].province_list
      return Object.keys(pList)
    })
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
  function enterBirthday(e) {
    setBirthday(e.target.value)
  }
  function selectCivilStatus(e) {
    setCivilStatus(e.target.value)
  }
  function tickConsent(e) {
    setConsent(e.target.checked)
  }

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      name: function () {
        return name.toUpperCase()
      },
      birthday: function () {
        if (birthday === '') return ''
        let format = 'YYYY-MM-DDTHH:mm:ssZ'
        return dayjs(birthday + 'T00:00:00').format(format)
      },
      civil_status: function () {
        return civilStatus
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
      name: request_field.name(),
      birthday: request_field.birthday(),
      civil_status: request_field.civil_status(),
      region: request_field.region(),
      province: request_field.province(),
      municipal: request_field.municipal(),
      barangay: request_field.barangay()
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
        <small>Registration</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Beneficiary Registration Form</h1>
        <p>
          By completing this form, you can register a beneficiary. Fields with{' '}
          <span className="sk-field-required">*</span> are required.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <Form onSubmit={submitForm}>
          <Field>
            <h2>Personal Information</h2>
          </Field>
          <Form.Row>
            <Field label="Name" required>
              <Input onChange={enterName} value={name} size="30" required />
            </Field>
          </Form.Row>
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
          <Form.Row>
            <Field label="Birthday" required>
              <Input
                onChange={enterBirthday}
                value={birthday}
                type="date"
                required
              />
            </Field>
            <Field label="Civil Status">
              <Select onChange={selectCivilStatus} value={civilStatus}>
                <Select.Option value="single">Single</Select.Option>
                <Select.Option value="married">Married</Select.Option>
                <Select.Option value="divorced">Divorced</Select.Option>
                <Select.Option value="separated">Separated</Select.Option>
                <Select.Option value="widowed">Widowed</Select.Option>
              </Select>
            </Field>
          </Form.Row>
          <Form.Row>
            <Field label="Data Privacy Consent" required>
              <Checkbox onChange={tickConsent} value={consent}>
                Consent obtained
              </Checkbox>
            </Field>
          </Form.Row>
          <Form.Footer>
            <Button type="submit" disabled={!consent && !loading}>
              Register beneficiary
            </Button>
            <Button
              onClick={() => route.to.Beneficiaries()}
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
