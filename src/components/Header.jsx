import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import headerStyles from './header.module.css'

const Header = () => {
  return (
          <div className={headerStyles.header}><h1>Serverless Todo App</h1></div>
  )
}

export default Header
