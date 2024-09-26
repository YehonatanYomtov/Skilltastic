// import { createUserWithEmailAndPassword } from "firebase/auth";
// import db from "../config/db";
// import { auth } from "../firebase/firebaseConfig";
// import { User } from "../types/index";

// export async function _signup({
//   name,
//   email,
//   password,
// }: {
//   name: string;
//   email: string;
//   password: string;
// }) {
//   try {
//     const userCredentials = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     const {
//       user: { uid },
//     } = userCredentials;

//     //! add condition that if firebase succeeds and the db fails it should delete what we created in firestore
//     const [user] = await db("users")
//       .insert({ auth_id: uid, name, email })
//       .returning(["id", "name", "email"]);

//     return user as User;
//   } catch (error) {
//     const err = error as Error;
//     //! Create rollback logic

//     console.error(err.message);
//   }
// }

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import db from "../config/db";
import { auth } from "../firebase/firebaseConfig";
import { User } from "../types";

export async function _getUserByEmail({
  email,
}: {
  email: string;
}): Promise<User | undefined> {
  try {
    console.log(">> email: ", email);

    const [user] = await db("users")
      // .select("id", "email", "name", "type")
      .select("*")
      .where({ email });

    return user;
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
  }
}

export async function _signup({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<User | undefined> {
  let createdUser: User | undefined = undefined;
  let firebaseUser: any;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    firebaseUser = userCredentials.user;

    const [user] = await db("users")
      .insert({ auth_id: firebaseUser.uid, name, email })
      .returning(["id", "name", "email"]);

    createdUser = user as User;

    return createdUser;
  } catch (error) {
    const err = error as Error;
    console.error(err.message);

    if (firebaseUser && firebaseUser.uid) {
      try {
        await deleteUser(firebaseUser);
      } catch (deleteError) {
        console.error("Failed to delete Firebase user:", deleteError);
      }
    }

    return undefined;
  }
}
