import { createContext, useReducer, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const UserActionTypes = {
  SetUser: "SET_USER",
  UpdateSaved: "UPDATE_SAVED",
  UpdateFavoriteTrip: "UPDATE_FAVORITE_TRIP",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SetUser:
      return action.payload;

    case UserActionTypes.UpdateSaved:
      if (state.savedTrips.includes(action.payload.id)) {
        //id can cause problems
        return state;
      }

    case UserActionTypes.UpdateFavoriteTrip:
      if (state.favoriteTrip.includes(action.payload.id)) {
        //id can cause problems
        return state;
      }
    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    id: null,
    name: null,
    email: null,
    addedTrip: [],
    addedTripCount: 0,
    savedTrips: [],
    savedTripCount: 0,
    favoriteTrip: [],
    favoriteTripCount: 0,
    createdAt: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log("User data:", userData);
          dispatch({
            type: UserActionTypes.SetUser,
            payload: {
              id: authUser.uid,
              email: authUser.email,
              name: userData.name || authUser.displayName,
              addedTrip: userData.addedTrip || [],
              addedTripCount: userData.addedTripCount || 0,
              savedTrips: userData.savedTrips || [],
              savedTripCount: userData.savedTripCount || 0,
              favoriteTrip: userData.favoriteTrip || [],
              favoriteTripCount: userData.favoriteTripCount || 0,
              createdAt: userData.createdAt || new Date(),
            },
          });
        }
      } else {
        dispatch({
          type: UserActionTypes.SetUser,
          payload: null,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, dispatch }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
