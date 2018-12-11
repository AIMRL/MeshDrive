import {
  ADD_DRIVE,
  SAVE_USER,
  REMOVE_USER,
  FETCH_DRIVE_ACCOUNTS_LIST,
  FETCH_TAGS_LIST,
  ADD_TAG
} from "../actions/user/types";
import getUserObjFromLocalStorage from "../utils/getUserObjFromLocalStorage";

let initialUserState = {
  token: null,
  email:null,
  driveAccountsList: {
    googleDriveAccountsList: [],
    dropBoxAccountsList: [],
    oneDriveAccountsList: []
  },
  tagsList:[]
};

const localStorageUserObj = getUserObjFromLocalStorage();
if (localStorageUserObj && localStorageUserObj.data) {
  const { token = null, email=null,driveAccountsList = {},tagsList=[] } = localStorageUserObj;
  initialUserState = {
    token,
    email,
    driveAccountsList,
    tagsList
  };
  console.log(initialUserState);
  debugger;
}

export default function(state = initialUserState, action) {
  switch (action.type) {
    case FETCH_TAGS_LIST:
    return { ...state, ...action.payload };

    case FETCH_DRIVE_ACCOUNTS_LIST:
      return { ...state, ...action.payload };

    case REMOVE_USER:
      return initialUserState;

    case SAVE_USER:
      const { driveAccountsList = {}, token = null, email=null } = action.payload;
      console.log(token);  
      return { ...state, token, driveAccountsList,email };

    case ADD_TAG:
    const { tagName, tagDescription } = action.payload;
    console.log(tagName,tagDescription);
    let newTagsState = Object.assign(state);
    newTagsState.tagsList.push({name:tagName,description:tagDescription});
    return newTagsState;

  }
  return state;
}
