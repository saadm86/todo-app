import React from "react"
import Header from "../components/Header"
import Inputbox from "../components/Inputbox"
import Todolist from '../components/Todolist'
import "bootstrap/dist/css/bootstrap.min.css"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($title: String!) {
    addTodo(title: $title) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation updateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const UNDO_DONE = gql`
  mutation undoTodoDone($id: ID! $title:String!) {
    undoTodoDone(id: $id, title: $title) {
      id
    }
  }
`;

export default function Home() {
  const { data, loading } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO)
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [undoTodoDone] = useMutation(UNDO_DONE)

  const handleSubmit = (title) => {
    addTodo({
        variables: {
            title,
        },
        refetchQueries: [{ query: GET_TODOS }]
    })
}

const handleDone = (id) => {
  updateTodoDone({
      variables: {
          id,
      },
      refetchQueries: [{ query: GET_TODOS }]
  })
}

const handleDelete = (id) => {
  deleteTodo({
      variables: {
          id,
      },
      refetchQueries: [{ query: GET_TODOS }]
  })
}

const handleUndo = (id, title) => {
  undoTodoDone({
      variables: {
        title,  
        id,
      },
      refetchQueries: [{ query: GET_TODOS }]
  })
}

  return (
    <div className='container'>
      <div className='row'>
        <div className="col-md-12 m-4"><Header /></div>
        <Inputbox handleSubmit={handleSubmit}/>
        {loading ? <h3>Loading...</h3>: data.todos.map(todo => {
          return (
            <div key={todo.id} className='col-md-12'><Todolist todos={todo} handleDone={handleDone} handleDelete={handleDelete} handleUndo={handleUndo}/></div>
          )
        })}
        
      </div>
    </div>
  )
}
