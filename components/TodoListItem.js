import axios from '../utils/axios'
import { useState } from 'react'
import { useAuth } from '../context/auth'
import { displayErrorToast, displaySuccessToast, displayInfoToast } from '../components/Toast'

export default function TodoListItem(props) {
  const { auth  } = useAuth()
  const [updateDesc, setupdateDesc] = useState(props.todo.title);
  const editTask = (id) => {
    setupdateDesc("");
    document.getElementById('task-' + id).classList.add('hideme');
    document.getElementById('task-actions-' + id).classList.add('hideme');
    document.getElementById('input-button-' + id).classList.remove('hideme');
    document.getElementById('done-button-' + id).classList.remove('hideme');
  }

  const deleteTask = (id) => {
    axios
    .delete('todo/'+id+'/', auth)
    .then(function ({ data, status }) {
        displaySuccessToast('Task deleted!')
        props.onDelete(props.todo);
    })
    .catch(function (err) {
      displayErrorToast("An error occurred!");
    });
  }

  const updateTask = (id) => {
    if (!updateDesc) {
        displayErrorToast("The update task field is empty!")
        return;
    }
    axios
    .patch('todo/'+id+'/',{ title: updateDesc}, auth)
    .then(function (response) {
        displaySuccessToast("Task has been updated.")
    }).catch(function (err) {
        displayErrorToast("Some error has occured.")
    });

    document.getElementById("task-" + id).innerText = updateDesc;
    document.getElementById('task-' + id).classList.remove('hideme');
    document.getElementById('task-actions-' + id).classList.remove('hideme');
    document.getElementById('input-button-' + id).classList.add('hideme');
    document.getElementById('done-button-' + id).classList.add('hideme');
  }

  return (
    <>
      <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={"input-button-"+props.todo.id}
          type='text'
          value={updateDesc}
          onChange={(e)=>{setupdateDesc(e.target.value)}}
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
        />
        <div id={'done-button-'+props.todo.id} className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>{updateTask(props.todo.id)}}
          >
            Done
          </button>
        </div>
        <div id={'task-'+props.todo.id} className='todo-task  text-gray-600'>
          {updateDesc}
        </div>
        <span id={'task-actions-'+props.todo.id} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => editTask(props.todo.id)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={() => deleteTask(props.todo.id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    </>
  )
}
