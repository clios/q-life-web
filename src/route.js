import { navigate } from '@reach/router'

const route = {
  path: {
    SignIn: '/',
    YourAccount: 'your-account',
    YourAccountUpdate: 'your-account/update',
    PlantationDashboard: 'plantation-dashboard',
    PlantationLocation: 'plantation-location',
    SuggestedReplantation: 'suggested-replantation',
    Beneficiaries: 'beneficiaries',
    Beneficiary: 'beneficiaries/:beneficiaryId',
    BeneficiaryCreate: 'beneficiaries/create',
    BeneficiaryUpdate: 'beneficiaries/:beneficiaryId/update/',
    FarmCreate: 'beneficiaries/:beneficiaryId/farm/create/',
    FarmUpdate: 'beneficiaries/:beneficiaryId/farm/:farmId/update/',
    PlantationCreate:
      'beneficiaries/:beneficiaryId/farm/:farmId/plantation/create/',
    PlantationUpdate:
      'beneficiaries/:beneficiaryId/farm/:farmId/plantation/:plantationId/update/',
    HarvestUpdate: 'beneficiaries/:beneficiaryId/harvest/:farmId/update/',
    PestDiseaseUpdate:
      'beneficiaries/:beneficiaryId/farm/:farmId/pest-disease/:plantationId/update/',
    Users: 'users',
    User: 'users/:userId',
    UserCreate: 'users/create',
    UserUpdate: 'users/:userId/update',
    TermsConditions: 'terms-conditions',
    PrivacyPolicies: 'privacy-policies'
  },
  to: {
    SignIn: function () {
      navigate(`/`)
    },
    YourAccount: function () {
      navigate(`/your-account`)
    },
    YourAccountUpdate: function () {
      navigate(`/your-account/update`)
    },
    PlantationDashboard: function (replace = false) {
      navigate(`/plantation-dashboard`, { replace: replace })
    },
    PlantationLocation: function () {
      navigate(`/plantation-location`)
    },
    SuggestedReplantation: function () {
      navigate(`/suggested-replantation`)
    },
    Beneficiaries: function () {
      navigate(`/beneficiaries`)
    },
    Beneficiary: function (beneficiaryId) {
      navigate(`/beneficiaries/${beneficiaryId}`)
    },
    BeneficiaryCreate: function () {
      navigate(`/beneficiaries/create`)
    },
    BeneficiaryUpdate: function (beneficiaryId) {
      navigate(`/beneficiaries/${beneficiaryId}/update/`)
    },
    FarmCreate: function (beneficiaryId) {
      navigate(`/beneficiaries/${beneficiaryId}/farm/create/`)
    },
    FarmUpdate: function (beneficiaryId, farmId) {
      navigate(`/beneficiaries/${beneficiaryId}/farm/${farmId}/update/`)
    },
    PlantationCreate: function (beneficiaryId, farmId) {
      let b = `/beneficiaries/${beneficiaryId}`
      let fp = `/farm/${farmId}/plantation/create/`
      navigate(b + fp)
    },
    PlantationUpdate: function (beneficiaryId, farmId, plantationId) {
      let bf = `/beneficiaries/${beneficiaryId}/farm/${farmId}`
      let p = `/plantation/${plantationId}/update/`
      navigate(bf + p)
    },
    HarvestUpdate: function (beneficiaryId, farmId) {
      navigate(`/beneficiaries/${beneficiaryId}/harvest/${farmId}/update/`)
    },
    PestDiseaseUpdate: function (beneficiaryId, farmId, plantationId) {
      let bf = `/beneficiaries/${beneficiaryId}/farm/${farmId}`
      let pd = `/pest-disease/${plantationId}/update/`
      navigate(bf + pd)
    },
    Users: function () {
      navigate(`/users`)
    },
    User: function (userId) {
      navigate(`/users/${userId}`)
    },
    UserCreate: function () {
      navigate(`/users/create`)
    },
    UserUpdate: function (userId) {
      navigate(`/users/${userId}/update`)
    },
    TermsConditions: function () {
      navigate(`/terms-conditions`)
    },
    PrivacyPolicies: function () {
      navigate(`/privacy-policies`)
    }
  }
}

export default route
