import { db, auth } from "./firebase";

/* Auth */
export const logInUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOutUser = () => {
  return auth.signOut();
};

export const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const initAuth = (onAuth) => {
  auth.onAuthStateChanged(onAuth);
};

/* DB */

export const getLists = (userId) => {
  return db
    .collection("lists")
    .where("userId", "==", userId)
    .get()
    .then(mapSnapshot)
    .catch((error) => {
      console.log("Error getting lists from firebase:", error);
    });
};

export const getTodos = (userId = '') => {
  return db.collection('todos')      
      .where("userId", "==", userId)
      .get()
      .then(mapSnapshot);
}

export const getListTodos = (listId) => {
  return db
    .collection("todos")
    .where("listId", "==", listId)    
    .get()
    .then(mapSnapshot)
    .catch((error) => {
      console.log("Error getting todos from firebase:", error);
    });
};

export const createList = (data) => {
  return db
    .collection("lists")
    .add({
      icon: '',
      sort: '',
      todos: [],      
      ...data      
    })
    .then((docRef) => {
      return docRef.get();
    })
    .then(mapDoc);
};

export const deleteList = (listId) => { 
  return db
    .collection("lists")
    .doc(listId)
    .delete()
    .then(() => listId);
};

export const updateList = (listId, data) => {
  return db
    .collection("lists")
    .doc(listId)
    .update(data)
    .then(() => ({ id: listId, ...data }));
};

export const createTodo = (data) => {
  return db
    .collection("todos")
    .add({
      ...data,
      completed: false,
      important: false,
      notes: '',
      dueDate: null,
      steps: []
    })
    .then((docRef) => {
      return docRef.get();
    })
    .then(mapDoc);
};

export const deleteTodo = (todoId) => { 
  return db
    .collection("todos")
    .doc(todoId)
    .delete()
    .then(() => todoId);
};

export const updateTodo = (todoId, data) => {
  return db
    .collection("todos")
    .doc(todoId)
    .update(data)
    .then(() => ({ id: todoId, ...data }));
};


const mapSnapshot = (snapshot) => {
  return snapshot.docs.map(mapDoc);
}

const mapDoc = (doc) => {
  return { id: doc.id, ...doc.data()};
} 
