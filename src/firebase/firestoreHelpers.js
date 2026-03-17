import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
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

export async function updateUser(userId, updates = {}) {
  if (!userId) throw new Error("User ID is required");

  const userRef = doc(db, "users", userId);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    // If user doesn't exist → create it
    await setDoc(userRef, {
      ...updates,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // If user exists → update only provided fields
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