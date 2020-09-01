import React, {useState, useEffect} from 'react';
import {db} from './firebase';

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    db.collection("todos").get().then((snapshot) => {
      const todos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      debugger;
      setTodos(todos);
      
  });
  }, []);
  return (
    <div>
      <h1>Task Manager App</h1>
      <ul>
        {todos.map( todo => 
            <li key={todo.id}>{todo.title}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
