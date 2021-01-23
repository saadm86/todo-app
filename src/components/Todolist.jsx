import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {CheckIcon, XCircleIcon} from '@primer/octicons-react'
import './Todolist.css'  


const Todolist = ({todos:{title, id, completed}, handleDone, handleDelete, handleUndo}) => {

  return (
    <>
      <ul className="list-group">
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
            <span className={`task-${completed}`}>{title}</span>
            <div>
            <button type="button" className="btn btn-secondary btn-sm mr-2" onClick={()=> !completed ? handleDone(id) : handleUndo(id, title)}>
            <CheckIcon size={16} />
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={()=>handleDelete(id)}>
            <XCircleIcon size={16} />
            </button>
            </div>
            </div>
          </li>
      </ul>
      
    </>
  )
}

export default Todolist
