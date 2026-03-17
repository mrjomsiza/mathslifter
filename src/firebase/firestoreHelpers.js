import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
  writeBatch,
  collection,
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

export function prepareParentAndStudentsData(parentUser, checkoutData) {
  if (!parentUser?.uid) {
    throw new Error("Parent user is required");
  }

  const parentEmail = parentUser.email || checkoutData?.parentEmail || "";
  const totalStudents = checkoutData?.totalStudents || 0;
  const totalSessions = checkoutData?.totalSessions || 0;
  const amountDue = checkoutData?.amountDue || 0;

  const parentUpdate = {
    totalStudents,
    totalSessions,
    amountDue,
    paymentStatus: checkoutData?.paymentStatus || "pending",
  };

  const studentDocs = (checkoutData?.students || []).map((student) => ({
    docId: student.id || doc(collection(db, "users")).id,
    data: {
      role: "student",
      name: student.name || "",
      mark: Number(student.mark) || 0,
      mode: student.mode || "online",
      sessions: Number(student.sessions) || 0,
      rate: Number(student.rate) || 0,
      total: Number(student.total) || 0,
      studentEmail: student.email || "",
      parentEmail,
      parentUid: parentUser.uid,
      loginEmail: parentEmail,
      password: student.password || "",
      paymentStatus: student.paymentStatus || "pending",
      accountStatus: "pending-claim",
      createdByParent: true,
    },
  }));

  return { parentUpdate, studentDocs };
}

export async function saveParentAndStudentRecords(parentUser, checkoutData) {
  const { parentUpdate, studentDocs } = prepareParentAndStudentsData(
    parentUser,
    checkoutData
  );

  const batch = writeBatch(db);
  const parentRef = doc(db, "users", parentUser.uid);

  batch.set(
    parentRef,
    {
      ...parentUpdate,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  studentDocs.forEach((student) => {
    const studentRef = doc(db, "users", student.docId);
    batch.set(
      studentRef,
      {
        uid: student.docId,
        ...student.data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });

  await batch.commit();

  return {
    parentUpdate,
    studentDocs,
    studentCount: studentDocs.length,
  };
}
