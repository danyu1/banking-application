'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient, } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({ email, password }:signInProps) => {
    try {
       // typically with a server action you want to either:  mutation, database, make a fetch 
       const { account } = await createAdminClient();

       const response = await account.createEmailPasswordSession(email, password)
       return parseStringify(response);
    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
       // typically with a server action you want to either:  mutation, database, make a fetch
       const { account } = await createAdminClient();


       const newUserAccount = await account.create(ID.unique(), userData.email, userData.password, `${userData.firstName} ${userData.lastName}`);
       const session = await account.createEmailPasswordSession(userData.email, userData.password);
     
       cookies().set("appwrite-session", session.secret, {
         path: "/",
         httpOnly: true,
         sameSite: "strict",
         secure: true,
       });
       //in next.js you cant pass large objects through server actions, rather you have to stringify it
       return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Error', error)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }

  export const logOutAccount = async () => {
    try {
      const { account } = await createSessionClient();

      cookies().delete('appwrite-session');
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }
  