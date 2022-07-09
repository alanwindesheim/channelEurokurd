import { createContext, useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/client";
import { useRouter } from "next/router";

const userContext = createContext({});

// Autehntication check ------------------------------------------------------------

const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === "SIGNED_IN") {
        setIsAuthenticated(true);
      }
      if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
      }
    }
  );

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  // Login click -----------------------------------------------------------------

  async function handleLogin(email) {
    const alertLogIn = !email.includes("alanwindesheim@gmail.com");
    try {
      if (alertLogIn) {
        alert("You are not registered");
        return;
      }
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
      } else {
        alert("Check your mail for the login link");
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  // Sing Out click --------------------------------------------------------------

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      } else {
        setIsAuthenticated(false);
        router.push("/login");
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  //Fetching profile user data --------------------------------------------------

  const [profile, setProfile] = useState("");

  async function fetchProfile() {
    try {
      const profileData = await supabase.auth.user();
      if (!profileData) {
        router.push("/login");
      } else {
        setProfile(profileData);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  // Fetching plates data ------------------------------------------------------

  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order("timeStamp", { ascending: false });
      // .order("id", { ascending: false });

      if (error) {
        throw error;
      } else {
        setPosts(data);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  //Add plate ------------------------------------------------------------------
  async function addPlate({
    title,
    backgroundInformation,
    ingredients,
    preparation,
    time,
    numberOf,
    difficulty,
    labels,
    culture,
    basis,
    avatarUrl,
    emailUser,
  }) {
    try {
      const { add, error } = await supabase
        .from("posts")
        .insert([
          {
            title,
            backgroundInformation,
            ingredients,
            preparation,
            time,
            numberOf,
            difficulty,
            labels,
            culture,
            basis,
            avatarUrl,
            emailUser,
          },
        ])
        .single();
      alert("Je plate is succesvol geplaatst!");
      router.push("/video");

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  //Delete plate ---------------------------------------------------------------
  async function deletePlate(id) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .match({ id });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  // Memo;
  const app = useMemo(
    () => ({
      authenticated: isAuthenticated,
      user: profile,
      plates: posts,
      handleLogin,
      signOut,
      fetchProfile,
      fetchPosts,
      addPlate,
      deletePlate,
    }),
    [isAuthenticated, profile, posts]
  );

  return <userContext.Provider value={app}>{children}</userContext.Provider>;
};

export { UserProvider, userContext };
