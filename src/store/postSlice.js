import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";

const initialState = {
  songs: [],
  loans: [],
  statusdata: {},
  user: [],
  searched: [],
  currentplaylist: [],
  isAuthenticated: false,
  justUpdated: false,
  error: "",
  playlistcreated: false,
  responseplaylist: [],
};
const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    tokenReceived: (posts, action) => {
      posts.user = action.payload;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.user["first_name"]);

      posts.isAuthenticated = true;
      posts.error = "";
    },
    LoansReceived: (state, action) => {
      state.loans = action.payload;
      state.justUpdated = false;
    },
    songsRecieved: (state, action) => {
      state.songs = action.songs;
    },
    StatusdataReceived: (state, action) => {
      state.statusdata = action.payload;
      state.justUpdated = false;
    },
    currentplaylist: (state, action) => {
      state.currentplaylist = action.payload.playlistsongs;
    },
    changePosts: (posts, action) => {
      posts.justUpdated = true;
      posts.playlistcreated = false;
      posts.searched = [];
    },
    songresults: (state, action) => {
      state.searched = action.payload;
    },
    logedout: (posts, action) => {
      localStorage.clear();
      return initialState;
    },
    errorOccoured: (posts, action) => {
      posts.error = action.payload;
    },
    responseplaylistReceived: (state, action) => {
      state.responseplaylist = action.payload;
      state.playlistcreated = true;
      state.searched = [];
    },
  },
});
export const {
  tokenReceived,
  LoansReceived,
  StatusdataReceived,
  changePosts,
  logedout,
  songresults,
  currentplaylist,
  errorOccoured,
  responseplaylistReceived,
} = slice.actions;

//authentication related
export const login = (data) =>
  actions.apicallbegan({
    method: "POST",
    onSuccess: tokenReceived.type,
    onRedirect: "/home",
    onError: errorOccoured.type,
    data: data,
    url: "/auth/login/",
  });
export const register = (data) =>
  actions.apicallbegan({
    method: "POST",
    url: "/users/",
    onSuccess: changePosts.type,

    data,
  });
export const logout = (headers) =>
  actions.apicallbegan({
    method: "POST",
    url: "/auth/logout/",
    onSuccess: logedout.type,

    headers,
    data: {},
  });
//songs related actions
export const songs = (data) =>
  actions.apicallbegan({
    method: "GET",
    url: "/song/",

    headers: data,
  });
export const addLoan = (data) =>
  actions.apicallbegan({
    method: "POST",
    url: "/l/",
    data,
    onSuccess: changePosts.type,
  });

export const searched = (keyword, headers) =>
  actions.apicallbegan({
    method: "GET",
    url: `/song/?search=${keyword}`,
    headers,
    onSuccess: songresults.type,
  });

//playlist related
export const createplaylist = (data, headers) =>
  actions.apicallbegan({
    method: "POST",
    url: "/createplaylist/",
    onSuccess: responseplaylistReceived.type,
    data,
    headers,
  });

export const getStatusdata = (data, id) =>
  actions.apicallbegan({
    method: "GET",
    url: `/loanstatus/${id}/`,
    onSuccess: StatusdataReceived.type,
    headers: data,
  });
export const addsongtoplaylist = (data, headers, id) =>
  actions.apicallbegan({
    method: "PATCH",
    url: `/addtoplaylist/${id}/`,
    data: data,
    headers,
    onSuccess: changePosts.type,
  });
export const deletesongfromplaylist = (data, headers, id) =>
  actions.apicallbegan({
    method: "PATCH",
    url: `/addtoplaylist/${id}/`,
    data: data,
    headers,
    onSuccess: changePosts.type,
  });
export const changeStatus = (data, headers, id) =>
  actions.apicallbegan({
    method: "PATCH",
    url: `/loanstatus/${id}/`,
    data: data,
    headers,
    onSuccess: changePosts.type,
  });

export const Loans = (data) =>
  actions.apicallbegan({
    method: "GET",
    url: "/loanlist/",
    onSuccess: LoansReceived.type,
    headers: data,
  });

export const getplaylistdataforupdate = (headers, id) =>
  actions.apicallbegan({
    method: "GET",
    url: `/addtoplaylist/${id}/`,
    headers,
    onSuccess: currentplaylist.type,
  });
export const adddummydatatoplaylist = (data, headers, id) =>
  actions.apicallbegan({
    method: "POST",
    url: `/addtoplaylist/`,
    data: data,
    headers,
    onSuccess: changePosts.type,
  });

export default slice.reducer;
