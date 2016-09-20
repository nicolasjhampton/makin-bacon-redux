"use strict";

const apiRequest = (context, path, auth, body, callback) => {
  let req = new XMLHttpRequest();
  req.open("POST", `http://localhost:3000/api${path}`);
  req.setRequestHeader("authorization", auth);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.addEventListener("load", callback);
  console.log(req);
  req.send(body);
}

export default apiRequest;
