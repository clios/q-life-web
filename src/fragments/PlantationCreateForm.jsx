// Fragment is a functional component used for
// all application User Interface logic.

// Import the local dependencies needed.
import spring from '../spring'
import route from '../route'
import Breadcrumbs from '../components/Breadcrumbs'
import ScreenTitle from '../components/ScreenTitle'

// Import the external dependencies needed.
import React from 'react'
import Cleave from 'cleave.js/react'
import { useSpring, animated } from 'react-spring'
import { Field, Form } from 'shirakami-ui'
import { Button, Select, Loader } from 'shirakami-ui'

// Make a Fragment by creating a functional component.
export default function PlantationCreateForm(props) {
  // Destructure all the props.
  const { beneficiary, farmId, loading } = props

  // Configure the cleave for number inputs.
  const numCleave = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

  // Create a copy of the props raw value by
  // declaring it again in an object.
  const raw = {
    beneficiary: {
      id: beneficiary?.id,
      name: beneficiary?.name
    },
    farmId: farmId
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
      return 'robusta'
    },
    area: function () {
      return 0
    },
    easting: function () {
      return 0
    },
    northing: function () {
      return 0
    },
    distributed: function () {
      return 0
    },
    survived: function () {
      return 0
    },
    vegetative: function () {
      return 0
    },
    flowering: function () {
      return 0
    },
    fruiting: function () {
      return 0
    },
    harvesting: function () {
      return 0
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

  // Functions to receive user data inputs.
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
      farm_id: function () {
        return Number(farmId)
      },
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
      farm_id: request_field.farm_id(),
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

    // Send submit form event to screen.
    props.onSubmitForm(request_body)
  }

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
        <small>Create Plantation</small>
      </Breadcrumbs>
      <ScreenTitle>
        <h1>Plantation Create Form</h1>
        <p>
          By editing this form, this beneficiary plantation information can be
          created.
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
            <Field label="Mortality">{distributed - survived}</Field>
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
              Create plantation
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
