import { createUserWithEmailAndPassword } from "firebase/auth";
import db from "../config/db";
import { auth } from "../firebase/firebaseConfig";
import { User } from "../types/index";

export async function _signup({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const {
      user: { uid },
    } = userCredential;

    //! add condition that if firebase succeeds and the db fails it should delete what we created in firestore
    const [user] = await db("users")
      .insert({ auth_id: uid, name, email })
      .returning(["id", "name", "email"]);

    return user as User;
  } catch (err) {
    //! Create rollback logic
    console.error(err);
  }
}

// async function _findUserByUsername(username) {
//   try {
//     const user = await db("users")
//       .select("users.id", "users.username", "hashpwd.password")
//       .join("hashpwd", "users.id", "=", "hashpwd.user_id")
//       .where("users.username", username)
//       .first();

//     return user;
//   } catch (err) {
//     throw err;
//   }
// }

// async function _getAllUsers() {
//   try {
//     const users = await db("users");
//     return users;
//   } catch (err) {
//     throw err;
//   }
// }

// async function _getAUser(id) {
//   try {
//     return await db("users").where({ id }).first();
//   } catch (err) {
//     throw err;
//   }
// }

// async function _updateAUser(id, user) {
//   const { email, username, first_name, last_name } = user;
//   return await db.transaction(async (trx) => {
//     try {
//       const oldUser = await trx("users").where({ id }).first();

//       if (email && email !== oldUser.email) {
//         const existingEmail = await trx("users").where({ email }).first();
//         if (existingEmail) {
//           throw new Error("Email is already taken");
//         }
//       }

//       if (username && username !== oldUser.username) {
//         const existingUsername = await trx("users").where({ username }).first();
//         if (existingUsername) {
//           throw new Error("Username is already taken");
//         }
//       }

//       await trx("users")
//         .where({ id })
//         .update({ email, username, first_name, last_name });

//       await trx.commit();
//       return true;
//     } catch (error) {
//       await trx.rollback();
//       console.error("Transaction rolled back due to error:", error);
//       throw error;
//     }
//   });
// }

// module.exports = {
//   _register,
//   _findUserByUsername,
//   _getAllUsers,
//   _getAUser,
//   _updateAUser,
// };
