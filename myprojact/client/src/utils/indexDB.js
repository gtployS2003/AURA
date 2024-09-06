import { openDB } from "idb";

// Function to initialize the IndexedDB
async function initDB() {
  const dbName = "WiseWardroAURA1";
  const dbVersion = 1;
  try {
    const db = await openDB(dbName, dbVersion, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`Upgrading IndexedDB from version ${oldVersion} to ${newVersion}`);
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("favorites")) {
          db.createObjectStore("favorites", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("favImages")) {
          db.createObjectStore("favImages", { keyPath: "id" });
        }
      },
    });
    return db;
  } catch (error) {
    throw new Error(`IndexedDB error: ${error}`);
  }
}

// Function to store images in IndexedDB
async function storeImages(images, formDataKeys) {
  const db = await initDB();
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");

  images.forEach((image, index) => {
    const formDataKey = formDataKeys[index];
    store.put({ id: formDataKey, blob: image.file });
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log("All files have been stored in IndexedDB.");
      resolve();
    };

    transaction.onerror = (event) => {
      reject(`IndexedDB transaction error: ${event.target.errorCode}`);
    };
  });
}

// Function to store favorite images in IndexedDB
async function storeFavImages(images) {
  const db = await initDB();
  const transaction = db.transaction("favImages", "readwrite");
  const store = transaction.objectStore("favImages");

  images.forEach((image) => {
    store.put(image);
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log("All favorite images have been stored in IndexedDB.");
      resolve();
    };

    transaction.onerror = (event) => {
      reject(`Error saving favorite images: ${event.target.errorCode}`);
    };
  });
}

// Function to get favorite images from IndexedDB
async function getFavImages() {
  const db = await initDB();
  const transaction = db.transaction("favImages", "readonly");
  const store = transaction.objectStore("favImages");

  return store.getAll();
}

// Function to retrieve images from IndexedDB
async function getImages() {
  const db = await initDB();
  const transaction = db.transaction("images", "readonly");
  const store = transaction.objectStore("images");

  return store.getAll();
}

// Function to clear images from IndexedDB
async function clearImages() {
  const db = await initDB();
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");

  return new Promise((resolve, reject) => {
    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
      console.log("All images have been cleared from IndexedDB.");
      resolve();
    };
    clearRequest.onerror = (event) => {
      reject(`Error clearing images store: ${event.target.errorCode}`);
    };
  });
}

// Function to save an outfit to the favorites store in IndexedDB
async function saveFavoriteOutfit(outfit) {
  const db = await initDB();
  const transaction = db.transaction("favorites", "readwrite");
  const store = transaction.objectStore("favorites");

  const outfitToSave = {
    ...outfit,
    id: outfit.outfit_id,
  };
  delete outfitToSave.outfit_id;

  return new Promise((resolve, reject) => {
    const request = store.put(outfitToSave);
    request.onsuccess = () => {
      console.log(`Outfit ${outfitToSave.id} saved successfully.`);
      resolve();
    };
    request.onerror = (event) => {
      reject(`Error saving the outfit: ${event.target.errorCode}`);
    };
  });
}

// Function to remove an outfit from favorites in IndexedDB
async function removeFavoriteOutfit(outfitId) {
  const db = await initDB();
  const transaction = db.transaction("favorites", "readwrite");
  const store = transaction.objectStore("favorites");

  return new Promise((resolve, reject) => {
    const request = store.delete(outfitId);
    request.onsuccess = () => {
      console.log(`Outfit with id ${outfitId} removed from favorites.`);
      resolve();
    };
    request.onerror = (event) => {
      reject(`Error removing outfit: ${event.target.errorCode}`);
    };
  });
}

// Function to check if there are images in IndexedDB
async function hasImages() {
  const db = await initDB();
  const transaction = db.transaction("images", "readonly");
  const store = transaction.objectStore("images");

  const countRequest = store.count();

  return new Promise((resolve, reject) => {
    countRequest.onsuccess = () => {
      resolve(countRequest.result > 0);
    };
    countRequest.onerror = (event) => {
      reject(`Error counting images: ${event.target.errorCode}`);
    };
  });
}

// Function to retrieve all favorite outfits from IndexedDB
async function getFavoriteOutfits() {
  const db = await initDB();
  const transaction = db.transaction("favorites", "readonly");
  const store = transaction.objectStore("favorites");

  return store.getAll();
}

// Function to retrieve all image blobs from IndexedDB
async function getImageBlobs() {
  const db = await initDB();
  const transaction = db.transaction("images", "readonly");
  const store = transaction.objectStore("images");

  return store.getAll();
}

export {
  initDB,
  storeImages,
  getImages,
  getImageBlobs,
  hasImages,
  clearImages,
  saveFavoriteOutfit,
  removeFavoriteOutfit,
  getFavoriteOutfits,
  storeFavImages,
  getFavImages,
};
