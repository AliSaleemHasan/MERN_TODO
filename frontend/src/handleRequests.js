const uri = "/tasks";
const usersUri = "/users";
const handleRequests = {
  get: async () => {
    const response = await fetch(uri);
    return response.json();
  },
  put: async (id, updatedTodo) => {
    const response = await fetch(uri + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
  post: async (input, id) => {
    const response = await fetch(uri, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ task: input, author: id }),
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
  getUser: async () => {
    const response = await fetch("/users/user");
    return response.json();
  },
  search: async (query) => {
    const response = await fetch("/tasks/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    return response.json();
  },

  logout: async () => {
    const response = await fetch("/users/logout");
    return response.json();
  },
};

export default handleRequests;
