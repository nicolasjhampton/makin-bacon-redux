"use strict";

const apiRequest = {
  request: function(path, auth, body) {
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open("POST", `http://localhost:3000/api${path}`);
      req.setRequestHeader("authorization", auth);
      if(body) {
        req.setRequestHeader("Content-type", "application/json");
      } else {
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }

      req.addEventListener("load", function() {
        if(this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          return resolve(data);
        } else {
          return reject(this.statusText);
        }
      });
      req.send(JSON.stringify(body));
    });
  },
  login: function(auth) {
    return this.request(`/players/login`, auth, null);
  },
  register: function(body) {
    return this.request(`/players`, null, body);
  }
}

export default apiRequest;
