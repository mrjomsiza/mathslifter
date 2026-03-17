import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function createUser(user, extraData = {}) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      phoneNumber: user.phoneNumber || "",
      provider: user.providerData?.[0]?.providerId || "google",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...extraData,
    },
    { merge: true }
  );
}

export async function findUserByEmail(email) {
  if (!email) return null;

  const usersRef = collection(db, "users");
  const emailQuery = query(usersRef, where("email", "==", email.toLowerCase()));
  const snapshot = await getDocs(emailQuery);

  if (snapshot.empty) return null;

  const docSnapshot = snapshot.docs[0];
  return {
    id: docSnapshot.id,
    ...docSnapshot.data(),
  };
}

export async function createParentAccount(user, extraData = {}) {
  await createUser(user, {
    role: "parent",
    email: user.email?.toLowerCase() || "",
    ...extraData,
  });
}

export async function createStudentAccount(user, parentEmail, extraData = {}) {
  const normalizedParentEmail = parentEmail.toLowerCase();
  const parent = await findUserByEmail(normalizedParentEmail);

  if (!parent || parent.role !== "parent") {
    throw new Error("Parent account not found. Ask the parent to register first.");
  }

  await createUser(user, {
    role: "student",
    email: user.email?.toLowerCase() || "",
    parentEmail: normalizedParentEmail,
    parentId: parent.uid || parent.id,
    linkedAt: serverTimestamp(),
    ...extraData,
  });
}

export async function updateUser(userId, updates = {}) {
  if (!userId) throw new Error("User ID is required");

  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      ...updates,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }
}

export async function saveParentCheckoutData(userId, checkoutData) {
  if (!userId) throw new Error("User ID is required");

  const userRef = doc(db, "users", userId);

  await setDoc(
    userRef,
    {
      tutoringCheckout: {
        ...checkoutData,
        payment: {
          ...(checkoutData?.payment || {}),
          status: checkoutData?.payment?.status || "pending",
        },
        updatedAt: serverTimestamp(),
      },
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
