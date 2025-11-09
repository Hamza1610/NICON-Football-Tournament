import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, User } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean; // True while checking initial session
  profileLoading: boolean; // True while fetching user profile
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial session check
  const [profileLoading, setProfileLoading] = useState(false); // Profile fetch status

  useEffect(() => {
    let mounted = true;

        // Function to create user profile (for new users)
    const createUserProfile = async (userId: string, userMetadata?: any) => {
      if (!mounted) return;

      try {
        // Check if pending registration data exists (from email/password signup)
        const pendingRegistration = sessionStorage.getItem('pendingRegistration');
        let profileData: any = {
          id: userId,
          role: 'player',
          payment_status: 'pending',
        };

        if (pendingRegistration) {
          // Use registration form data
          const registrationData = JSON.parse(pendingRegistration);
          profileData = {
            ...profileData,
            full_name: registrationData.fullName,
            email: registrationData.email,
            age: registrationData.age,
            position: registrationData.position,
            jersey_number: registrationData.jerseyNumber,
          };
          // Clear pending registration data
          sessionStorage.removeItem('pendingRegistration');
        } else if (userMetadata) {
          // Use OAuth metadata (Google, etc.)
          profileData = {
            ...profileData,
            full_name: userMetadata.full_name || 
                      userMetadata.name || 
                      userMetadata.email?.split('@')[0] || 
                      'User',
            email: userMetadata.email || '',
            photo_url: userMetadata.avatar_url || userMetadata.picture,
          };
        }

        const { error: insertError } = await supabase
          .from('users')
          .insert(profileData);

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        }
      } catch (error) {
        console.error('Unexpected error creating user profile:', error);
      }
    };
    // Function to fetch user profile from database
    const fetchUserProfile = async (userId: string, createIfMissing = false, userMetadata?: any) => {
      if (!mounted) return;
      
      setProfileLoading(true);
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        console.log("Data...: ", data);

        if (error) {
          console.error('Error fetching user profile:', error);
          // Don't set user to null on error - session is still valid
          // Profile might not exist yet or there might be a temporary issue
        } else if (mounted) {
          if (data) {
            setUser(data);
          } else if (createIfMissing) {
            // Profile doesn't exist, create it
            await createUserProfile(userId, userMetadata);
            // Fetch the newly created profile
            const { data: newData, error: fetchError } = await supabase
              .from('users')
              .select('*')
              .eq('id', userId)
              .maybeSingle();
            
            if (!fetchError && newData && mounted) {
              setUser(newData);
            }
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching user profile:', error);
      } finally {
        if (mounted) {
          setProfileLoading(false);
        }
      }
    };

    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        if (mounted) {
          setSession(session);
          
          // Set loading to false immediately - don't wait for profile
          setLoading(false);
          // If session exists, fetch user profile
          if (session?.user) {
            
            await fetchUserProfile(session.user.id);
          }
          
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;

        setSession(newSession);

        if (newSession?.user) {
          // User signed in or session refreshed
          // Check if this is a new signup (SIGNED_UP event) or OAuth login
          const isNewUser = event === 'SIGNED_UP' || event === 'SIGNED_IN';
          await fetchUserProfile(
            newSession.user.id,
            isNewUser, // create profile if missing for new users
            newSession.user.user_metadata // pass metadata for OAuth users
          );
        } else {
          // User signed out
          setUser(null);
          setProfileLoading(false);
        }

        // Ensure loading is false after auth state change
        if (mounted) {
          setLoading(false);
        }
      }
    );

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // State will be updated by onAuthStateChange
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        loading,
        profileLoading,
        signOut 
      }}
    >
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