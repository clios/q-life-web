// The content is in control of how
// the main content will be organized

// Local dependency
import './Content.css'

// External dependencies
import React from 'react'
import { Flex } from 'shirakami-ui'

function Content({ children }) {
  return (
    <Flex className="layout-content" column>
      {children}
    </Flex>
  )
}

export default Content
