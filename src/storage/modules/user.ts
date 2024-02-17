 
import { USER_COLLECTION } from "@/storage";

const collectionStoredName = `${USER_COLLECTION}`;

export async function createNewUser(user) {
  try {
     await localStorage.setItem(collectionStoredName, user);

  } catch (error) {
    throw error;
  }
}

export async function getStoredUser(){
    try{
        const user = localStorage.getItem(collectionStoredName) || []

        return user
    }catch (error) {
        throw error;
    }

}