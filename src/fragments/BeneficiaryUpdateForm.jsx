// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import address from '../address.json'
import spring from '../spring'
import route from '../route'
import snackbar from '../snackbar'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'

// Import the external dependencies needed.
import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Input, Loader, Select } from 'shirakami-ui'
import dayjs from 'dayjs'

// Make a Fragment by creating a functional component.
export default function BeneficiaryUpdateForm(props) {
  // Destructure all the props.
  const { beneficiary, loading } = props

  // Configure the snackbar.
  const [infoSnackbar] = useSnackbar(snackbar.info)

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    beneficiary: {
      id: beneficiary?.id,
      name: beneficiary?.name,
      birthday: beneficiary?.birthday,
      civil_status: beneficiary?.civil_status,
      region: beneficiary?.region,
      province: beneficiary?.province,
      municipal: beneficiary?.municipal,
      barangay: beneficiary?.barangay
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
      return raw.beneficiary.region || '02'
    },
    provinceList: function () {
      return Object.keys(address[dv.region()].province_list)
    },
    province: function () {
      return raw.beneficiary.province || 'QUIRINO'
    },
    municipalList: function () {
      let pList = address[dv.region()].province_list[dv.province()]
      let mList = pList.municipality_list
      return Object.keys(mList)
    },
    municipal: function () {
      return raw.beneficiary.municipal || 'CABARROGUIS'
    },
    barangayList: function () {
      let pList = address[dv.region()].province_list[dv.province()]
      let mList = pList.municipality_list
      let bList = mList[dv.municipal()].barangay_list
      return Object.values(bList)
    },
    barangay: function () {
      return raw.beneficiary.barangay || ''
    },
    birthday: function () {
      let format = 'YYYY-MM-DD'
      return dayjs(raw.beneficiary.birthday).format(format)
    },
    civilStatus: function () {
      return raw.beneficiary.civil_status
    }
  }

  // Initialize the states needed to render.
  const beneficiaryId = dv.beneficiaryId()
  const [name, setName] = React.useState(dv.name())
  const [region, setRegion] = React.useState(dv.region())
  const regionList = dv.regionList()
  const [province, setProvince] = React.useState(dv.province())
  const [provinceList, setProvinceList] = React.useState(dv.provinceList())
  const [municipalList, setMunicipalList] = React.useState(dv.municipalList())
  const [municipal, setMunicipal] = React.useState(dv.municipal())
  const [barangayList, setBarangayList] = React.useState(dv.barangayList())
  const [barangay, setBarangay] = React.useState(dv.barangay())
  const [birthday, setBirthday] = React.useState(dv.birthday())
  const [civilStatus, setCivilStatus] = React.useState(dv.civilStatus())

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

    // Filter out the fields of request body
    // with the same value in props raw state.
    if (request_body.name === raw.beneficiary.name) {
      delete request_body.name
    }
    if (request_body.birthday === raw.beneficiary.birthday) {
      delete request_body.birthday
    }
    if (request_body.civil_status === raw.beneficiary.civil_status) {
      delete request_body.civil_status
    }
    if (request_body.region === raw.beneficiary.region) {
      delete request_body.region
    }
    if (request_body.province === raw.beneficiary.province) {
      delete request_body.province
    }
    if (request_body.municipal === raw.beneficiary.municipal) {
      delete request_body.municipal
    }
    if (request_body.barangay === raw.beneficiary.barangay) {
      delete request_body.barangay
    }

    // Verify if there is an update.
    if (JSON.stringify(request_body) === JSON.stringify({})) {
      infoSnackbar('No changes made')
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
        <small onClick={() => route.to.Beneficiaries()}>
          Registered Beneficiaries
        </small>
        <small onClick={() => route.to.Beneficiary(beneficiaryId)}>
          {name}
        </small>
        <small>Update</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Beneficiary Update Form</h1>
        <p>
          By editing this form, this beneficiary personal information can be
          updated. Fields with <span className="sk-field-required">*</span> are
          required.
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
          <Form.Footer>
            <Button disabled={loading} type="submit">
              Update beneficiary
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
