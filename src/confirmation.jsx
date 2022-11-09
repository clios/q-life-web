// Local dependency
import ConfirmationBox from './components/ConfirmationBox'

// External dependencies
import React from 'react'
import { Button, Form } from 'shirakami-ui'

const SignOut = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Sign Out</h3>
      <p>Would you like to sign out?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Sign out
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const YourAccountUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update Your Account</h3>
      <p>Would you like to update your account?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const UserCreate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Create User</h3>
      <p>Would you like to create this account?</p>
      <p>
        After the user' account is created, be sure to notify the OIC Project
        Head immediately.
      </p>
      <p>You must remind the user to immediately update his/her password.</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Register
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const UserDeactivate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Deactivate User</h3>
      <p>Would you like to deactivate this account?</p>
      <p>
        Make sure it is ordered by the OIC Project Head. Once the user account
        is deactivated, the user will no longer be able to access the system.
      </p>
      <p>It can be reactivated in case access is needed.</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Deactivate
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const UserReactivate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Reactivate User</h3>
      <p>Would you like to reactivate this account?</p>
      <p>
        Make sure it is ordered by the OIC Project Head. Once the user account
        is reactivated, the user will be able to access the system.
      </p>
      <p>It can be deactivated in case access is no longer needed.</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Reactivate
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const UserUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update User</h3>
      <p>Would you like to update this account?</p>
      <p>
        After the user' account is updated, be sure to notify the OIC Project
        Head immediately.
      </p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const BeneficiaryCreate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Create Beneficiary</h3>
      <p>Would you like to register this beneficiary?</p>
      <p>
        Make sure this individual is already registered as beneficiary of Q-LiFE
        UEP.
      </p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Register
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const BeneficiaryDelete = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Delete Beneficiary</h3>
      <p>Would you like to delete this beneficiary?</p>
      <p>
        Once the beneficiary is deleted, all information associated with the
        beneficiary will be deleted as well. This action is irreversible.
      </p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Delete
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const BeneficiaryUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update Beneficiary</h3>
      <p>Would you like to update this beneficiary?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const FarmCreate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Create Farm</h3>
      <p>Would you like to create this farm?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Create
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const FarmUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update Farm</h3>
      <p>Would you like to update this farm?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const HarvestUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update Harvest</h3>
      <p>Would you like to update this harvest?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const PestDiseaseUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update Pest and Disease</h3>
      <p>Would you like to update this pest and disease?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const PlantationCreate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Create Plantation</h3>
      <p>Would you like to create this plantation?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Create
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const PlantationUpdate = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Update Plantation</h3>
      <p>Would you like to update this plantation?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Update
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

const DownloadMap = (props) => (
  <Form onSubmit={() => props.onSubmit()}>
    <ConfirmationBox>
      <h3>Download Map</h3>
      <p>Would you like to download this map?</p>
    </ConfirmationBox>
    <Form.Footer>
      <Button type="submit" autoFocus>
        Download
      </Button>
      <Button onClick={props.onClose} type="button" variant="text">
        Cancel
      </Button>
    </Form.Footer>
  </Form>
)

export default {
  SignOut,
  YourAccountUpdate,
  UserCreate,
  UserDeactivate,
  UserReactivate,
  UserUpdate,
  BeneficiaryCreate,
  BeneficiaryDelete,
  BeneficiaryUpdate,
  FarmCreate,
  FarmUpdate,
  HarvestUpdate,
  PestDiseaseUpdate,
  PlantationCreate,
  PlantationUpdate,
  DownloadMap
}
