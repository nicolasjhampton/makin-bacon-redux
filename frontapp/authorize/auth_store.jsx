"use strict";

const authStore = () => {
  if(sessionStorage.baconAuth && sessionStorage.baconUser) {
    return {
      authorization: sessionStorage.baconAuth,
      currentUser: sessionStorage.baconUser,
    };
  } else if(localStorage.baconAuth && localStorage.baconUser) {
    return {
      authorization: localStorage.baconAuth,
      currentUser: localStorage.baconUser,
    };
  }

  return null;
}

export default authStore;
