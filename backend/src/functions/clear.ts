import { db } from '../config/firebase';

const clear = async () => {
  const collections = await db.listCollections();
  await Promise.all(
    collections.map(async (collection) => {
      const querySnapshot = await collection.get();
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          await doc.ref.delete();
        })
      );
    })
  );
  return;
};

export { clear };
