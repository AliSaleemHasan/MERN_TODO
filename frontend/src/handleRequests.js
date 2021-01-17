const uri = "http://localhost:3000/tasks";
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
};

export default handleRequests;
