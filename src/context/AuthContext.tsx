import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, User } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
        setUser(user);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (() => {
        setSession(session);
        if (session) {
          fetchUserProfile(session.user.id);
          setUser(user);
        } else {
          setUser(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}




















// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { supabase, User } from '../lib/supabase';
// import { Session } from '@supabase/supabase-js';

// // Extend the context type to include a flag for initial session load
// interface AuthContextType {
//   session: Session | null;
//   user: User | null; // This will be the profile from 'users' table
//   loading: boolean; // This now reflects the initial session/profile loading state
//   profileLoading: boolean; // New: reflects only the profile fetch status
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [initialLoadComplete, setInitialLoadComplete] = useState(false); // Tracks initial load
//   const [profileLoading, setProfileLoading] = useState(false); // Tracks profile fetch

//   useEffect(() => {
//     // Function to fetch initial session and profile
//     const loadInitialSession = async () => {
//     // Inside loadInitialSession
//     if (session) {
//       setProfileLoading(true);
//       try {
//         await fetchUserProfile(session.user.id);
//       } catch (profileError) {
//         // Optionally log the error or handle it
//         console.error("Error fetching profile during initial load:", profileError);
//         // Ensure profileLoading is stopped even on error
//         setProfileLoading(false);
//         // Optionally setUser(null) or a default state if profile is critical
//         // setUser(null);
//       }
//     }
//     // This line MUST execute regardless of fetchUserProfile outcome
//     setInitialLoadComplete(true);
//     };

//     loadInitialSession();

//     // Subscribe to auth state changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
//       setSession(newSession);

//       if (newSession) {
//         // A new session exists (e.g., after login/signup)
//         // Fetch the corresponding profile
//         setProfileLoading(true);
//         await fetchUserProfile(newSession.user.id);
//         // Note: initialLoadComplete remains true after the first load,
//         // so we don't set it here again.
//       } else {
//         // User signed out
//         setUser(null);
//         // Profile loading is not relevant on sign out
//         setProfileLoading(false);
//       }
//     });

//     return () => {
//       if (subscription) {
//         subscription.unsubscribe();
//       }
//     };
//   }, []); // Run only once on mount

//   const fetchUserProfile = async (userId: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('users')
//         .select('*')
//         .eq('id', userId)
//         .maybeSingle();

//       if (error) {
//         // Log error but don't necessarily set user to null unless desired
//         console.error('Error fetching user profile:', error);
//         // setUser(null); // Decide if setting to null on error is correct
//       } else {
//         setUser(data); // Update user with profile data
//       }
//     } catch (error) {
//       console.error('Unexpected error fetching user profile:', error);
//       // setUser(null); // Decide on error handling strategy
//     } finally {
//       // Always stop the profile loading indicator after fetch attempt
//       setProfileLoading(false);
//     }
//   };

//   const signOut = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     setUser(null);
//     // No need to manage loading states here, onAuthStateChange will handle it
//   };

//   // Calculate the main 'loading' state for the context
//   // It's true only during the *initial* load phase (checking session, fetching profile if needed)
//   // It becomes false once the initial state is established, regardless of subsequent profile updates
//   const overallLoading = !initialLoadComplete; // True only until initial load is done

//   return (
//     <AuthContext.Provider
//       value={{
//         session,
//         user,
//         loading: overallLoading, // Use the calculated loading state
//         profileLoading, // Expose profile loading state separately
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }