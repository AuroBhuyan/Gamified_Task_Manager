export function ensureUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("userId", id);
  }
  return id;
}

async function fetchJSON(url, opts = {}) {
    
    const userId = ensureUserId();
    opts.headers = opts.headers || {};
    opts.headers["x-user-id"] = userId;
    if (opts.body && !(opts.body instanceof FormData)) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(opts.body);
    }
    const res = await fetch(url, opts);
    const text = await res.text();
    try {
      const data = text ? JSON.parse(text) : null;
      if (!res.ok) throw new Error(data?.error || text || res.statusText);
      return data;
    } catch (err) {

      if (!res.ok) throw new Error(text || res.statusText);
      return JSON.parse(text);
    }
  }
  
  /* Tasks */
  export const getTasks = () => fetchJSON("/api/tasks");
  export const createTask = (payload) => fetchJSON("/api/tasks", { method: "POST", body: payload });
  export const updateTask = (id, payload) => fetchJSON(`/api/tasks/${id}`, { method: "PATCH", body: payload });
  export const deleteTask = (id) => fetchJSON(`/api/tasks/${id}`, { method: "DELETE" });
  export const completeTask = (id) => fetchJSON(`/api/tasks/${id}/complete`, { method: "POST" });
  
  /* Quest */
  export const generateQuest = () => fetchJSON("/api/quest/generate", { method: "POST" });
  export const getQuest = () => fetchJSON("/api/quest");
  export const attackQuest = () => fetchJSON("/api/quest/attack", { method: "POST" });
  export const getUserPokemons = () => fetchJSON("/api/quest/pokemons");
  
  /* User */
  export const getUser = () => fetchJSON("/api/users/me");

  /* Rewards */
export const getRewards = () => fetchJSON("/api/rewards");
export const createReward = (payload) =>
  fetchJSON("/api/rewards", { method: "POST", body: payload });
export const updateReward = (id, payload) =>
  fetchJSON(`/api/rewards/${id}`, { method: "PATCH", body: payload });
export const deleteReward = (id) =>
  fetchJSON(`/api/rewards/${id}`, { method: "DELETE" });
  export const redeemReward = (id) =>
  fetchJSON(`/api/rewards/${id}/redeem`, { method: "POST" });

