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
import { useSpring, animated } from 'react-spring'
import { Button, Select, Loader } from 'shirakami-ui'
import { Field, Form } from 'shirakami-ui'
import Cleave from 'cleave.js/react'
import { useSnackbar } from 'react-simple-snackbar'

// Make a Fragment by creating a functional component.
export default function PlantationUpdateForm(props) {
  // Destructure all the props.
  const { beneficiary, plantation, loading } = props

  // Configure the cleave for number inputs.
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
      variety: plantation?.variety,
      area: plantation?.area,
      easting: plantation?.easting,
      northing: plantation?.northing,
      seedlings_distributed: plantation?.seedlings_distributed,
      seedlings_survived: plantation?.seedlings_survived,
      seedlings_mortality: plantation?.seedlings_mortality,
      seedlings_vegetative: plantation?.seedlings_vegetative,
      seedlings_flowering: plantation?.seedlings_flowering,
      seedlings_fruiting: plantation?.seedlings_fruiting,
      seedlings_harvesting: plantation?.seedlings_harvesting
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
    variety: function () {
      return raw.plantation.variety
    },
    area: function () {
      return raw.plantation.area
    },
    easting: function () {
      return raw.plantation.easting
    },
    northing: function () {
      return raw.plantation.northing
    },
    distributed: function () {
      return raw.plantation.seedlings_distributed
    },
    survived: function () {
      return raw.plantation.seedlings_survived
    },
    vegetative: function () {
      return raw.plantation.seedlings_vegetative
    },
    flowering: function () {
      return raw.plantation.seedlings_flowering
    },
    fruiting: function () {
      return raw.plantation.seedlings_fruiting
    },
    harvesting: function () {
      return raw.plantation.seedlings_harvesting
    }
  }

  // Initialize the states needed to render.
  const beneficiaryId = dv.beneficiaryId()
  const name = dv.name()
  const [coffeeVariety, setCoffeeVariety] = React.useState(dv.variety())
  const [area, setArea] = React.useState(dv.area())
  const [distributed, setDistributed] = React.useState(dv.distributed())
  const [survived, setSurvived] = React.useState(dv.survived())
  const [vegetative, setVegetative] = React.useState(dv.vegetative())
  const [flowering, setFlowering] = React.useState(dv.flowering())
  const [fruiting, setFruiting] = React.useState(dv.fruiting())
  const [harvesting, setHarvesting] = React.useState(dv.harvesting())
  const [northing, setNorthing] = React.useState(dv.northing())
  const [easting, setEasting] = React.useState(dv.easting())

  // Functions for receiving user data inputs.
  function selectCoffeeVariety(e) {
    setCoffeeVariety(e.target.value)
  }
  function enterArea(e) {
    setArea(e.target.rawValue)
  }
  function enterDistributed(e) {
    setDistributed(e.target.rawValue)
  }
  function enterSurvived(e) {
    setSurvived(e.target.rawValue)
  }
  function enterVegetative(e) {
    setVegetative(e.target.rawValue)
  }
  function enterFlowering(e) {
    setFlowering(e.target.rawValue)
  }
  function enterFruiting(e) {
    setFruiting(e.target.rawValue)
  }
  function enterHarvesting(e) {
    setHarvesting(e.target.rawValue)
  }
  function enterNorthing(e) {
    setNorthing(e.target.rawValue)
  }
  function enterEasting(e) {
    setEasting(e.target.rawValue)
  }

  // Formulate the proper request body and
  // perform client side validations.
  function submitForm(e) {
    e.preventDefault()

    // Mutate the states into valid format for
    // the request body object keys and values.
    let request_field = {
      variety: function () {
        return coffeeVariety
      },
      area: function () {
        return Number(area)
      },
      easting: function () {
        return Number(easting)
      },
      northing: function () {
        return Number(northing)
      },
      seedlings_distributed: function () {
        return Number(distributed)
      },
      seedlings_survived: function () {
        return Number(survived)
      },
      seedlings_vegetative: function () {
        return Number(vegetative)
      },
      seedlings_flowering: function () {
        return Number(flowering)
      },
      seedlings_fruiting: function () {
        return Number(fruiting)
      },
      seedlings_harvesting: function () {
        return Number(harvesting)
      }
    }

    // Create request body by combining the
    // request fields into a single object.
    let request_body = {
      variety: request_field.variety(),
      area: request_field.area(),
      easting: request_field.easting(),
      northing: request_field.northing(),
      seedlings_distributed: request_field.seedlings_distributed(),
      seedlings_survived: request_field.seedlings_survived(),
      seedlings_vegetative: request_field.seedlings_vegetative(),
      seedlings_flowering: request_field.seedlings_flowering(),
      seedlings_fruiting: request_field.seedlings_fruiting(),
      seedlings_harvesting: request_field.seedlings_harvesting()
    }

    // Filter out the fields of request body
    // with the same value in props raw state.
    if (request_body.variety === raw.plantation.variety) {
      delete request_body.variety
    }
    if (request_body.area === raw.plantation.area) {
      delete request_body.area
    }
    if (request_body.northing === raw.plantation.northing) {
      delete request_body.northing
    }
    if (request_body.easting === raw.plantation.easting) {
      delete request_body.easting
    }
    if (
      request_body.seedlings_distributed ===
      raw.plantation.seedlings_distributed
    ) {
      delete request_body.seedlings_distributed
    }
    if (request_body.seedlings_survived === raw.plantation.seedlings_survived) {
      delete request_body.seedlings_survived
    }
    if (
      request_body.seedlings_vegetative === raw.plantation.seedlings_vegetative
    ) {
      delete request_body.seedlings_vegetative
    }
    if (
      request_body.seedlings_flowering === raw.plantation.seedlings_flowering
    ) {
      delete request_body.seedlings_flowering
    }
    if (request_body.seedlings_fruiting === raw.plantation.seedlings_fruiting) {
      delete request_body.seedlings_fruiting
    }
    if (
      request_body.seedlings_harvesting === raw.plantation.seedlings_harvesting
    ) {
      delete request_body.seedlings_harvesting
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
    setCoffeeVariety(plantation.variety)
  }, [plantation.variety])

  React.useEffect(() => {
    setArea(plantation.area)
  }, [plantation.area])

  React.useEffect(() => {
    setDistributed(plantation.seedlings_distributed)
  }, [plantation.seedlings_distributed])

  React.useEffect(() => {
    setSurvived(plantation.seedlings_survived)
  }, [plantation.seedlings_survived])

  React.useEffect(() => {
    setVegetative(plantation.seedlings_vegetative)
  }, [plantation.seedlings_vegetative])

  React.useEffect(() => {
    setFlowering(plantation.seedlings_flowering)
  }, [plantation.seedlings_flowering])

  React.useEffect(() => {
    setFruiting(plantation.seedlings_fruiting)
  }, [plantation.seedlings_fruiting])

  React.useEffect(() => {
    setHarvesting(plantation.seedlings_harvesting)
  }, [plantation.seedlings_harvesting])

  React.useEffect(() => {
    setNorthing(plantation.northing)
  }, [plantation.northing])

  React.useEffect(() => {
    setEasting(plantation.easting)
  }, [plantation.easting])

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
        <small>Update Plantation</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Plantation Update Form</h1>
        <p>
          By editing this form, this beneficiary plantation information can be
          updated.
        </p>
      </ScreenTitle>
      <animated.div style={useSpring(spring.delayFadeIn)}>
        <Form onSubmit={submitForm}>
          <Field>
            <h2>Plantation Information</h2>
          </Field>
          <Form.Row>
            <Field label="Coffee Variety">
              <Select
                onChange={selectCoffeeVariety}
                value={coffeeVariety}
                disabled>
                <Select.Option value="robusta">Robusta</Select.Option>
              </Select>
            </Field>
            <Field label="Area (hectare)">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterArea}
                value={area}
                size="10"
              />
            </Field>
          </Form.Row>
          <Form.Row>
            <Field label="Distributed">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterDistributed}
                value={distributed}
                size="10"
              />
            </Field>
            <Field label="Survived">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterSurvived}
                value={survived}
                size="10"
              />
            </Field>
            <Field label="Mortality">{distributed - survived || 0}</Field>
          </Form.Row>
          <Form.Row>
            <Field label="Vegetative">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterVegetative}
                value={vegetative}
                size="10"
              />
            </Field>
            <Field label="Flowering">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterFlowering}
                value={flowering}
                size="10"
              />
            </Field>
            <Field label="Fruiting">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterFruiting}
                value={fruiting}
                size="10"
              />
            </Field>
            <Field label="Harvesting">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterHarvesting}
                value={harvesting}
                size="10"
              />
            </Field>
          </Form.Row>
          <Form.Row>
            <Field label="Northing">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterNorthing}
                value={northing}
                size="10"
              />
            </Field>
            <Field label="Easting">
              <Cleave
                className="sk-input"
                options={numCleave}
                onChange={enterEasting}
                value={easting}
                size="10"
              />
            </Field>
          </Form.Row>
          <Form.Footer>
            <Button disabled={loading} type="submit">
              Update plantation
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
