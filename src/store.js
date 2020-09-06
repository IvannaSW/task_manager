import * as api from "../src/api";

export function reducer(state, action) {
  switch (action.type) {
    case "GET_LISTS":
      return {
        ...state,
        lists: action.payload.lists,
      };
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "CREATE_TODO":
      debugger;
      return {
        ...state,
        todos: [...state.todos, action.payload.todo]
        
      };
    case "UPDATE_TODO":          
      return {
        ...state,
        todos: state.todos.map((todo) => {
            if (todo.id === action.payload.todo.id){
                return { ...todo, ...action.payload.todo }
            }
            else {
                return todo;
            }            
        }),
    };
    case "GET_LIST_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.todoId),
      };
    default:
      return state;
  }
}

export const initialState = {
  lists: [],
  todos: [],
};

export const getLists = (dispatch) => {
  return api.getLists().then((lists) =>
    dispatch({
      type: "GET_LISTS",
      payload: { lists },
    })
  );
};

export const getTodos = (dispatch) => {
  return api.getLists().then((todos) =>
    dispatch({
      type: "GET_TODOS",
      payload: { todos },
    })
  );
};

export const getListTodos = (listId, dispatch) => {
  return api.getListTodos(listId).then((todos) =>
    dispatch({
      type: "GET_LIST_TODOS",
      payload: { todos },
    })
  );
};

export const createTodo = (data, dispatch) => {   
  return api.createTodo(data).then((todo) =>
    dispatch({
      type: "CREATE_TODO",
      payload: {
        todo
      },
    })
  );
};

export const deleteTodo = (todoId, dispatch) => {
  return api.deleteTodo(todoId).then((todoId) =>
    dispatch({
      type: "DELETE_TODO",
      payload: {
        todoId,
      },
    })
  );
};

export const updateTodo = (todoId, data, dispatch) => { 
debugger;     
  return api.updateTodo(todoId, data).then((todo) =>    
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        todo,
      },
    })
  );
};

export const actions = {
  getLists,
  getTodos,
  getListTodos,
  updateTodo,
  deleteTodo,
  createTodo,
};
