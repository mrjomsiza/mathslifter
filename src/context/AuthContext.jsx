import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserProfile } from "../firebase/firestoreService";
import { AuthContext } from "./authContextInstance";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user || null);

      if (!user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({ currentUser, userProfile, loading, setUserProfile }),
    [currentUser, userProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
