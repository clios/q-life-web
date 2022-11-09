import React from 'react'
import { Router } from '@reach/router'
import route from './route'
import SignIn from './screens/SignIn'
import MainLayout from './layout/MainLayout'

import YourAccount from './screens/YourAccount'
import YourAccountUpdate from './screens/YourAccountUpdate'

import PlantationDashboard from './screens/PlantationDashboard'
import PlantationLocation from './screens/PlantationLocation'
import SuggestedReplantation from './screens/SuggestedReplantation'

import Beneficiaries from './screens/Beneficiaries'
import Beneficiary from './screens/Beneficiary'
import BeneficiaryCreate from './screens/BeneficiaryCreate'
import BeneficiaryUpdate from './screens/BeneficiaryUpdate'

import FarmCreate from './screens/FarmCreate'
import FarmUpdate from './screens/FarmUpdate'

import PlantationCreate from './screens/PlantationCreate'
import PlantationUpdate from './screens/PlantationUpdate'

import HarvestUpdate from './screens/HarvestUpdate'

import PestDiseaseUpdate from './screens/PestDiseaseUpdate'

import Users from './screens/Users'
import User from './screens/User'
import UserCreate from './screens/UserCreate'
import UserUpdate from './screens/UserUpdate'

import PrivacyPolicies from './screens/PrivacyPolicies'
import TermsConditions from './screens/TermsConditions'

function Routes() {
  return (
    <Router>
      <SignIn path={route.path.SignIn} />
      <MainLayout path="/">
        <YourAccount path={route.path.YourAccount} />
        <YourAccountUpdate path={route.path.YourAccountUpdate} />

        <PlantationDashboard path={route.path.PlantationDashboard} />
        <PlantationLocation path={route.path.PlantationLocation} />
        <SuggestedReplantation path={route.path.SuggestedReplantation} />

        <Beneficiaries path={route.path.Beneficiaries} />
        <Beneficiary path={route.path.Beneficiary} />
        <BeneficiaryCreate path={route.path.BeneficiaryCreate} />
        <BeneficiaryUpdate path={route.path.BeneficiaryUpdate} />

        <FarmCreate path={route.path.FarmCreate} />
        <FarmUpdate path={route.path.FarmUpdate} />

        <PlantationCreate path={route.path.PlantationCreate} />
        <PlantationUpdate path={route.path.PlantationUpdate} />

        <HarvestUpdate path={route.path.HarvestUpdate} />

        <PestDiseaseUpdate path={route.path.PestDiseaseUpdate} />

        <Users path={route.path.Users} />
        <User path={route.path.User} />
        <UserCreate path={route.path.UserCreate} />
        <UserUpdate path={route.path.UserUpdate} />

        <TermsConditions path={route.path.TermsConditions} />
        <PrivacyPolicies path={route.path.PrivacyPolicies} />
      </MainLayout>
    </Router>
  )
}

export default Routes
