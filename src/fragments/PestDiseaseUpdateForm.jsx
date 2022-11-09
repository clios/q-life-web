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
export default function PestDiseaseUpdateForm(props) {
  // Destructure all the props.
  const { beneficiary, plantation, loading } = props

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
    plantation: {
      id: plantation?.id,
      pests_ant: plantation?.pests_ant,
      pests_aphid: plantation?.pests_aphid,
      pests_stemborer: plantation?.pests_stemborer,
      pests_others: plantation?.pests_others
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
    ants: function () {
      return raw.plantation.pests_ant
    },
    aphids: function () {
      return raw.plantation.pests_aphid
    },
    stemBorers: function () {
      return raw.plantation.pests_stemborer
    },
    others: function () {
      return raw.plantation.pests_others
    }
  }

  // Initialize the states needed to render.
  const beneficiaryId = dv.beneficiaryId()
  const name = dv.name()
  const [ants, setAnts] = React.useState(dv.ants())
  const [aphids, setAphids] = React.useState(dv.aphids())
  const [stemBorers, setStemBorers] = React.useState(dv.stemBorers())
  const [others, setOthers] = React.useState(dv.others())

  // Functions for receiving user data inputs.
  function enterAnts(e) {
    setAnts(e.target.rawValue)
  }
  function enterAphids(e) {
    setAphids(e.target.rawValue)
  }
  function enterStemBorers(e) {
    setStemBorers(e.target.rawValue)
  }
  function enterOthers(e) {
    setOthers(e.target.rawValue)
  }

  // Transmutation for API request
  function transmutation() {
    let mutation = {}

    let mutated = {}

    // Filter same key and value

    return mutated
  }

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      ants: function () {
        return Number(ants)
      },
      aphids: function () {
        return Number(aphids)
      },
      stemBorers: function () {
        return Number(stemBorers)
      },
      others: function () {
        return Number(others)
      }
    }

    // Create request body by combining the
    // request fields into a single object.
    let request_body = {
      pests_ant: request_field.ants(),
      pests_aphid: request_field.aphids(),
      pests_stemBorer: request_field.stemBorers(),
      pests_others: request_field.others()
    }

    // Filter out the fields of request body
    // with the same value in props raw state.
    if (request_body.pests_ant === raw.plantation.pests_ant) {
      delete request_body.pests_ant
    }
    if (request_body.pests_aphid === raw.plantation.pests_aphid) {
      delete request_body.pests_aphid
    }
    if (request_body.pests_stemBorer === raw.plantation.pests_stemborer) {
      delete request_body.pests_stemBorer
    }
    if (request_body.pests_others === raw.plantation.pests_other) {
      delete request_body.pests_others
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
    setAnts(plantation.pests_ant)
  }, [plantation.pests_ant])

  React.useEffect(() => {
    setAphids(plantation.pests_aphid)
  }, [plantation.pests_aphid])

  React.useEffect(() => {
    setStemBorers(plantation.pests_stemborer)
  }, [plantation.pests_stemborer])

  React.useEffect(() => {
    setOthers(plantation.pests_others)
  }, [plantation.pests_others])

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
        <small>Update Pest and Disease</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Pest and Disease Update Form</h1>
        <p>
          By editing this form, this beneficiary pest and disease information
          can be updated.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <Form onSubmit={submitForm}>
          <Field>
            <h2>Pest and Disease Information</h2>
          </Field>
          <Form.Row>
            <Field label="Ants (%)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterAnts}
                value={ants}
                size="10"
              />
            </Field>
            <Field label="Aphids (%)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterAphids}
                value={aphids}
                size="10"
              />
            </Field>
            <Field label="Stem Borers (%)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterStemBorers}
                value={stemBorers}
                size="10"
              />
            </Field>
            <Field label="Others (%)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterOthers}
                value={others}
                size="10"
              />
            </Field>
          </Form.Row>
          <Form.Footer>
            <Button disabled={loading} type="submit">
              Update pest and disease
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
