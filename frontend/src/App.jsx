import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  // it is not the correct way to send the request to backend. --> we need to use useEffect hook
  useEffect(() => {
    fetch("http://localhost:3000/todos")
    .then(async function(res){
      const json = await res.json();
      setTodos(json.todos);
    })
  }, [])
  

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos}/>
    </div>
  )
}

export default App
