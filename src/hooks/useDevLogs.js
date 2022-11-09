// This hook makes it easier to log api requests

function useDevLogs(header = '', req = 'N/A', res = 'N/A') {
  // Exit if not in development mode
  if (!process.env.DEVELOP_MODE) return

  // Set up message and style
  let msg = `%c ${header} `
  let style = 'background: black; color: white'

  // Log the API request structure to the console
  console.log(msg, style)
  console.log(`REQUEST:`)
  console.log(req)
  console.log(`RESPONSE:`)
  console.log(res)
}

export default useDevLogs
