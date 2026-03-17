import { createOrMergeUserProfile, getUserProfile, saveStudentPlanSelection } from "./firestoreService";

// Backward-compatible helper names for future cleanup.
export const createUser = createOrMergeUserProfile;
export const updateUser = createOrMergeUserProfile;
export const getUser = getUserProfile;
export const savePlan = saveStudentPlanSelection;
