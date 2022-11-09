// This hook captures env variables and
// returns them as an object with a simpler name

function useEnv() {
  // Get the variables in env
  const NODE_ENV = process.env.NODE_ENV
  const APP_TITLE = process.env.APP_TITLE
  const APP_VERSION = process.env.APP_VERSION
  const API_QLIFE = process.env.API_QLIFE
  const DEVELOP_MODE = process.env.DEVELOP_MODE
  const LOCAL_MODE = process.env.LOCAL_MODE

  // Return variables as an object
  return {
    NODE_ENV,
    APP_TITLE,
    APP_VERSION,
    API_QLIFE,
    DEVELOP_MODE,
    LOCAL_MODE
  }
}

export default useEnv
