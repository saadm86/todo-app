import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"


const Button = ({handleSubmit, title}) => {
  return (
    <>
    <button type="button" className="btn btn-primary" onClick={()=>handleSubmit(title)}>Submit</button>
    </>
  )
}

export default Button
