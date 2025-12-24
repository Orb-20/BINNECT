import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // ✅ Added token state
  const [loading, setLoading] = useState(true);

  // Logout function using Firebase signOut
  const logout = () => {
    setToken(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // ✅ Get the actual JWT token from Firebase
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
      } else {
        setToken(null);
      }
      
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    // ✅ Expose token in the value object
    <AuthContext.Provider value={{ user, token, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}