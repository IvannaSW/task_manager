import { db } from "./firebase";

export const getLists = () => {
  return db
    .collection("lists")
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    })
    .catch((error) => {
      console.log("Error getting lists from firebase:", error);
    });
};

export const getListTodos = (listId) => {
  return db
    .collection("todos")
    .where("listId", "==", listId)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    })
    .catch((error) => {
      console.log("Error getting todos from firebase:", error);
    });
};

export const createTodo = (data) => {
  return db
    .collection("todos")
    .add({
      ...data,
      completed: false,
    })
    .then((docRef) => {
      return docRef.get();
    })
    .then((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteTodo = (todoId) => {
  return db
    .collection("todos")
    .doc(todoId)
    .delete()
    .then(() => todoId);
};
