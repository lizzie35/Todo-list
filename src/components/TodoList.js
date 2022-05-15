import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchtodos = async () => {
            const res = await fetch('http://localhost:5001/todos')
            const data = await res.json()

            console.log(data)
        }

        fetchtodos()
    }, [])

//ADD TODO
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos);
    };

//UPDATE
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
};

    
    //REMOVE
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
    
        setTodos(removedArr);
      };

      //COMPLETE
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if ( todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo; 
        });
        setTodos(updatedTodos);
    };

  return (
    <div>
        <h1>TO-DO LIST :</h1>
        <h1>What's the plan for today?</h1>
        <TodoForm onSubmit={addTodo} />
        <Todo
         todos={todos} 
         completeTodo={completeTodo}
         removeTodo={removeTodo}
         updateTodo={updateTodo}
         />
    </div>
  );
}

export default TodoList;