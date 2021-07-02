import { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { displaySuccessToast, displayErrorToast } from '../components/Toast'

export default function AddTask() {
  const { auth } = useAuth()
  const [TaskDesc, setTaskDesc] = useState("");
  const addTask = (e) => {
    e.preventDefault()
    if (!TaskDesc || TaskDesc=="") {
      displayErrorToast("The task field is empty!");
      return;
    }
    else {
      axios.post(
        'todo/create/',
        { title: TaskDesc},
        auth,
      )
        .then(function ({ response }) {
          axios
            .get("todo/", auth)
            .then(function ({ data, status }) {
                displaySuccessToast("The task has been added!");
            });
        })
        .catch(function (err) {
          displayErrorToast("Some error has occured.")
        })
    }
    setTaskDesc("");
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type ='text'
        value = {TaskDesc}
        onChange={(e)=>{setTaskDesc(e.target.value)}}
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        placeholder='Enter Task'
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
