const uri = "http://localhost:3000/tasks";
const usersUri = "http://localhost:3000/users";
const OauthUri = "http://localhost:3000/auth";
const handleRequests = {
  get: async (urip) => {
    const response = await fetch(uri + urip);
    return response.json();
  },
  put: async (id, updatedTodo) => {
    const response = await fetch(uri + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ task: updatedTodo }),
    });
    return response.json();
  },
  putCheck: async (id, check) => {
    const response = await fetch(uri + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ checked: check }),
    });
    return response.json();
  },
  post: async (input) => {
    const response = await fetch(uri, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ task: input }),
    });
    return response.json();
  },
  deleteOne: async (id) => {
    const response = await fetch(uri + `/${id}`, {
      method: "Delete",
    });
    return response.json();
  },
  deleteAll: async () => {
    const response = await fetch(uri, {
      method: "DELETE",
    });
    return response.json();
  },
  login: async (username, password) => {
    const response = await fetch(usersUri + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    return response.json();
  },
  signup: async (username, password, firstname, lastname) => {
    const response = await fetch(usersUri + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
      }),
    });
    return response.json();
  },
  googleOauth: async () => {
    const response = await fetch(OauthUri + "/google", {
      method: "GET",
      mode: "no-cors",
    });
    return response.json();
  },
  githubOauth: async () => {
    const response = await fetch(OauthUri + "/github", {
      method: "GET",
      mode: "no-cors",
    });
    return response.json();
  },
};

export default handleRequests;
