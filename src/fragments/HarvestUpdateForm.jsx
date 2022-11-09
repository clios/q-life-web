// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import spring from '../spring'
import route from '../route'
import snackbar from '../snackbar'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'

// Import the external dependencies needed.
import React from 'react'
import Cleave from 'cleave.js/react'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Loader } from 'shirakami-ui'
import { useSnackbar } from 'react-simple-snackbar'

// Make a Fragment by creating a functional component.
export default function HarvestUpdateForm(props) {
  // Destructure all the props.
  const { beneficiary, farm, loading } = props

  // Configure cleave for number inputs.
  const numCleave = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

  // Configure the snackbar.
  const [infoSnackbar] = useSnackbar(snackbar.info)

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    beneficiary: {
      id: beneficiary?.id,
      name: beneficiary?.name
    },
    farm: {
      id: farm?.id,
      harvests_fresh: farm?.harvests_fresh,
      harvests_dry: farm?.harvests_dry,
      harvests_gcb: farm?.harvests_gcb
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
    fresh: function () {
      return raw.farm.harvests_fresh || 0
    },
    dry: function () {
      return raw.farm.harvests_dry || 0
    },
    gcb: function () {
      return raw.farm.harvests_gcb || 0
    }
  }

  // Initialize the states needed to render.
  const beneficiaryId = dv.beneficiaryId()
  const name = dv.name()
  const [fresh, setFresh] = React.useState(dv.fresh())
  const [dry, setDry] = React.useState(dv.dry())
  const [gcb, setGcb] = React.useState(dv.gcb())

  // Functions for receiving user data inputs.
  function enterFresh(e) {
    setFresh(e.target.rawValue)
  }
  function enterDry(e) {
    setDry(e.target.rawValue)
  }
  function enterGcb(e) {
    setGcb(e.target.rawValue)
  }

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      fresh: function () {
        return Number(fresh)
      },
      dry: function () {
        return Number(dry)
      },
      gcb: function () {
        return Number(gcb)
      }
    }

    // Create request body by combining the
    // request fields into a single object.
    let request_body = {
      harvests_fresh: request_field.fresh(),
      harvests_dry: request_field.dry(),
      harvests_gcb: request_field.gcb()
    }

    // Filter out the fields of request body
    // with the same value in props raw state.
    if (request_body.harvests_fresh == raw.farm.harvests_fresh) {
      delete request_body.harvests_fresh
    }
    if (request_body.harvests_dry == raw.farm.harvests_dry) {
      delete request_body.harvests_dry
    }
    if (request_body.harvests_gcb == raw.farm.harvests_gcb) {
      delete request_body.harvests_gcb
    }

    // Verify if there is an update.
    if (JSON.stringify(request_body) === JSON.stringify({})) {
      infoSnackbar('No changes made')
      return
    }

    // Send submit form event to screen.
    props.onSubmitForm(request_body)
  }

  React.useEffect(() => {
    setFresh(farm.harvests_fresh)
  }, [farm.harvests_fresh])

  React.useEffect(() => {
    setDry(farm.harvests_dry)
  }, [farm.harvests_dry])

  React.useEffect(() => {
    setGcb(farm.harvests_gcb)
  }, [farm.harvests_gcb])

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
        <small>Update Harvest</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Harvest Update Form</h1>
        <p>
          By editing this form, this beneficiary harvest information can be
          updated.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <Form onSubmit={submitForm}>
          <Field>
            <h2>Harvest Information</h2>
          </Field>
          <Form.Row>
            <Field label="Fresh (kilo)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterFresh}
                value={fresh}
                size="10"
              />
            </Field>
            <Field label="Dry (kilo)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterDry}
                value={dry}
                size="10"
              />
            </Field>
            <Field label="GCB (kilo)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterGcb}
                value={gcb}
                size="10"
              />
            </Field>
          </Form.Row>
          <Form.Footer>
            <Button disabled={loading} type="submit">
              Update harvest
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
