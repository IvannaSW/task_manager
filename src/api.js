import { db } from "./firebase";

export const get = (collectionName) => {
  const collection = db.collection(collectionName);
  return async (query = () => collection) => {
    try {
      const snapshot = await query(collection)
        .get();
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    }
    catch (error) {
      console.log("Error getting data from firebase:", error);
    }
  };
};
