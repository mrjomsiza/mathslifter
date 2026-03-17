import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function createOrMergeUserProfile(user, profileInput) {
  const userRef = doc(db, "users", user.uid);
  const payload = {
    uid: user.uid,
    email: user.email || "",
    name: profileInput.name || user.displayName || "",
    role: profileInput.role,
    grade: profileInput.grade || "",
    subjects: profileInput.subjects || [],
    tutorId: profileInput.tutorId || null,
    plan: profileInput.plan || null,
    updatedAt: serverTimestamp(),
  };

  const existing = await getDoc(userRef);
  if (!existing.exists()) payload.createdAt = serverTimestamp();

  await setDoc(userRef, payload, { merge: true });
}

export async function getUserProfile(uid) {
  const userSnap = await getDoc(doc(db, "users", uid));
  return userSnap.exists() ? userSnap.data() : null;
}

export async function saveStudentPlanSelection(uid, plan) {
  await setDoc(
    doc(db, "pricingPlans", uid),
    {
      userId: uid,
      ...plan,
      status: "pending",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function createTutorStudentAssignment({ tutorId, studentId }) {
  await addDoc(collection(db, "tutorStudentAssignments"), {
    tutorId,
    studentId,
    createdAt: serverTimestamp(),
    status: "active",
  });
}

export async function getTutorStudents(tutorId) {
  const assignmentQ = query(
    collection(db, "tutorStudentAssignments"),
    where("tutorId", "==", tutorId)
  );

  const assignments = await getDocs(assignmentQ);
  const studentIds = assignments.docs.map((item) => item.data().studentId);
  if (!studentIds.length) return [];

  // Firestore where-in supports max 10 IDs; keep MVP simple.
  const usersQ = query(collection(db, "users"), where("uid", "in", studentIds.slice(0, 10)), limit(10));
  const usersSnap = await getDocs(usersQ);

  return usersSnap.docs.map((item) => item.data());
}
