export async function login(username, password) {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  return res.json();
}

export async function register(username, password) {
  const res = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  return res.json();
}

export async function getProfile(token) {
  const res = await fetch("http://localhost:5000/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
}