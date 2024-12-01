import { db } from "@/firebase";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import User from "@/types/userTypes/userType";
import { Map } from "@/types/mapTypes/mapType";

export async function getUsersFromDB() {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const users = querySnapshot.docs.map((doc) => doc.data() as User);
    return users;
  } catch (error) {
    console.error("Failed to load map", error);
  }
}

export async function getUserFromDB(userUid: string) {
  try {
    const userRef = doc(db, "users", userUid);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    return userSnapshot.data();
  } catch (error) {
    console.error("Failed to fetch user data");
  }
}

export async function registerUserToDB(values: User, userUid: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const emailQuery = query(usersCollectionRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      return { error: "Email already exists" };
    }

    await setDoc(doc(usersCollectionRef, userUid), {
      uid: userUid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      maps: [],
      createdAt: new Date(),
    });

    return { uid: userUid };
  } catch (error) {
    console.error("Failed to register user to database");
  }
}

export async function updateUserToDB(userUid: string, values: Partial<User>) {
  try {
    const userRef = doc(db, "users", userUid);

    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const updateData = { ...values };
    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error("Failed to update user", error);
  }
}

export async function saveMapToUserDB(userUid: string, newMapValues: Map) {
  try {
    const userRef = doc(db, "users", userUid);

    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnapshot.data();
    const maps = userData.maps || [];

    const newMaps = [...maps, newMapValues];

    await updateDoc(userRef, { maps: newMaps });
  } catch (error) {
    console.error("Failed to save map to user database");
  }
}

export async function updateMapToUserDB(userUid: string, mapId: string, newMapValues: Partial<Map>) {
  try {
    const userRef = doc(db, "users", userUid);

    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnapshot.data();
    const maps = userData.maps;

    const updatedMaps = maps.map((map: Map) => (map.mapId === mapId ? { ...map, ...newMapValues } : map));
    await updateDoc(userRef, { maps: updatedMaps });
  } catch (error) {
    console.error("Failed to update map in user document:", error);
  }
}

// export async function removeMapFromUserDB(userUid: string, mapId: string) {
//   try {
//     const userRef = doc(db, "users", userUid);

//     const userSnapshot = await getDoc(userRef);
//     if (!userSnapshot.exists()) {
//       console.error("User not found");
//       return;
//     }

//     const userData = userSnapshot.data();
//     const maps = userData.maps;

//     const updatedMaps = maps.filter((map: Map) => map.mapId !== mapId);
//     console.log(updatedMaps)

//     await updateDoc(userRef, { maps: updatedMaps });
//     console.log(`Map with ID ${mapId} removed successfully from user document.`);
//   } catch (error) {
//     console.error("Failed to remove map from user database");
//   }
// }
