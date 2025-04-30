import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Sign up
  const signUpNewUser = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Problem with the signing up: ", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Recovery password
  const recoveryPassword = async ({ email }) => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      console.error("Problem with the signing up: ", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Update password
  const updatePassword = async ({ email, password }) => {
    const { data, error } = await supabase.auth.updateUser({
        email: email,
        password: password,
      })
    if (error) {
      console.error("Problem with the signing up: ", error);
      return { success: false, error };
    }
    return { success: true, data };
  }


  // Sign in
  const signInUser = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Problem with the signing in: ", error);
        return { success: false, error };
      }
      console.log("User signed in: ", data);
      return { success: true, data };
    } catch (error) {
      console.error("Problem with the signing in: ", error);
      return { success: false, error };
    }
  };

  // Sign out
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("Problem with the signing out: ", error);
      return { success: false, error };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signOut, signInUser, recoveryPassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
