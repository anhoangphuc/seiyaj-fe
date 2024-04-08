import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import systemSlice from "./systemSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    system: systemSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
