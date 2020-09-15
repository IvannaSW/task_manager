import * as api from '../api';

/* Auth */
export const logInUser = (email, password) => {
    return api.logInUser(email, password).then(() => ({}));
}

export const signOutUser = () => {
    return api.signOutUser().then(() => ({}));
}

export const registerUser = (email, password) => {
    return api.registerUser(email, password).then(() => ({}));
}

export const initAuth = () => {
    return dispatch => api.initAuth(user => {
        return user ? dispatch({
            type: 'LOGIN_USER',
            payload: {
                user
            }
        }) : dispatch({
            type: 'LOGOUT_USER'
        });
    });
}


/* DB */
export const getLists = (userId) => {
    return api.getLists(userId)
        .then(lists => ({
            type: 'GET_LISTS',
            payload: {
                lists
            }
        }));
}

export const getTodos = (userId) => {
    return api.getTodos(userId)
        .then(todos => ({
            type: 'GET_TODOS',
            payload: {
                todos
            }
        }));
}

export const getListTodos = (listId) => {
    return api.getListTodos(listId)
        .then(todos => ({
            type: 'GET_LIST_TODOS',
            payload: {
                todos
            }
        }));
}

export const createList = (data) => {
    return api.createList(data)
        .then(list => ({
            type: 'CREATE_LIST',
            payload: {
                list
            }
        }));
}

export const updateList = (listId, data) => {
    return api.updateList(listId, data)
        .then(list => ({
            type: 'UPDATE_LIST',
            payload: {
                list
            }
        }));
}

export const deleteList = (listId) => {    
    return api.deleteList(listId)
        .then(listId => ({
            type: 'DELETE_LIST',
            payload: {
                listId
            }
        }));
}

export const createTodo = (data) => {
    return api.createTodo(data)
        .then(todo => ({
            type: 'CREATE_TODO',
            payload: {
                todo
            }
        }));
}

export const updateTodo = (todoId, data) => {
    return api.updateTodo(todoId, data)
        .then(todo => ({
            type: 'UPDATE_TODO',
            payload: {
                todo
            }
        }));
}

export const deleteTodo = (todoId) => {    
    return api.deleteTodo(todoId)
        .then(todoId => ({
            type: 'DELETE_TODO',
            payload: {
                todoId
            }
        }));
}