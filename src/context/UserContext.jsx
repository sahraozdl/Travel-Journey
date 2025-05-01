import { createContext, useReducer, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const UserActionTypes = {
  SetUser: "SET_USER",
  UpdateSaved: "UPDATE_SAVED",
  UpdateFavoriteTrip: "UPDATE_FAVORITE_TRIP",
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SetUser:
      return {
        ...action.payload,
        savedTripCount: action.payload.savedTrips.length,
        favoriteTripCount: action.payload.favoriteTrip.length,
        addedTripCount: action.payload.addedTrip.length,
      };

    case UserActionTypes.UpdateSaved:
      if (!state) return state;
      if (state.savedTrips.includes(action.payload.id)) {
        return {
          ...state,
          savedTrips: [...state.savedTrips, action.payload.id],
          savedTripCount: state.savedTrips.length + 1,
        };
      }
      return state;

    case UserActionTypes.UpdateFavoriteTrip:
      if (!state) return state;
      if (state.favoriteTrip.includes(action.payload.id)) {
        return {
          ...state,
          favoriteTrip: [...state.favoriteTrip, action.payload.id],
          favoriteTripCount: state.favoriteTrip.length + 1,
        };
      }
      return state;

    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    id: null,
    name: null,
    email: null,
    addedTrip: [],
    savedTrips: [],
    favoriteTrip: [],
    createdAt: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);

        const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log("User data:", userData);

            dispatch({
              type: UserActionTypes.SetUser,
              payload: {
                id: authUser.uid,
                email: authUser.email,
                name: userData.name || authUser.name,
                addedTrip: userData.addedTrip || [],
                savedTrips: userData.savedTrips || [],
                favoriteTrip: userData.favoriteTrip || [],
                createdAt: userData.createdAt || new Date(),
              },
            });
            setLoading(false);
          }
        });
        return () => unsubscribeUser();
      } else {
        dispatch({
          type: UserActionTypes.SetUser,
          payload: {
            id: null,
            name: null,
            email: null,
            addedTrip: [],
            savedTrips: [],
            favoriteTrip: [],
            createdAt: null,
          },
        });
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch, loading }}>
      {children}
    </UserContext.Provider>
  );
};
