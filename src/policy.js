const admin = 'admin'
const clerk = 'clerk'
const aide = 'aide'

const group = {
  open: [admin, clerk, aide],
  s: [admin],
  a: [admin, clerk]
}

const policy = {
  route: {
    beneficiaries: group.open,
    beneficiary: group.open,
    beneficiary_create: group.open,
    beneficiary_update: group.open,
    farm_create: group.open,
    farm_update: group.open,
    harvest_update: group.open,
    pest_disease_update: group.open,
    plantation_create: group.open,
    plantation_dashboard: group.open,
    plantation_location: group.open,
    plantation_update: group.open,
    suggested_replantation: group.open,
    user: group.a,
    user_create: group.a,
    users: group.a,
    user_update: group.a
  },
  component: {
    sidebar_user: group.a
  }
}

export default policy
