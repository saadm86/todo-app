import React, {useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from './Button'

const Inputbox = ({handleSubmit}) => {
  const [title, setTitle] = useState()
  return (
    <>
    <div className="col-md-10">
      <div className="input-group input-group-md mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Todo
          </span>
        </div>
        <input
          onChange={e=>setTitle(e.target.value)}
          type="text"
          placeholder="Enter the Task"
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    </div>
    <div className="col-md-2">
    <Button handleSubmit={handleSubmit} title={title}/>
    </div>
    </>
  )
}

export default Inputbox
