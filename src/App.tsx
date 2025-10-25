import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
// import { Todo } from './types/Todo';
// import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from './app/storeHooks';
// import { Status } from './types/Status';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [query, setQuery] = useState<string>('');
  // const [selectedFilter, setSelectedFilter] = useState<Status>('all');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const dispatch = useAppDispatch();
  // const todos = useSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todoFromApi => {
        dispatch(todosSlice.actions.setTodos(todoFromApi));
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  // const visibleTodos = todos
  //   .filter(todo => {
  //     if (selectedFilter === 'active') {
  //       return !todo.completed;
  //     }

  //     if (selectedFilter === 'completed') {
  //       return todo.completed;
  //     }

  //     return true;
  //   })
  //   .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !errorMessage && <TodoList />}

              {!loading && errorMessage && (
                <div className="notification is-danger" data-cy="error">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
