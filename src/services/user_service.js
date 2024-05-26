const API_URL = "http://localhost:8080/users";

export async function getUserByUsername(username) {
  const response = await fetch(`${API_URL}?username=${username}`);
  const json = await response.json();
  return json;
}
export async function changePassword(changePasswordDTO) {
  const response = await fetch(`${API_URL}/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: changePasswordDTO.username,
      oldPassword: changePasswordDTO.oldPassword,
      newPassword: changePasswordDTO.newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Incorrect old password");
  }
  return response;
}

export async function addNewEmployee(userRequestDTO) {
  const response = await fetch(`${API_URL}/addUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userRequestDTO.username,
      role: userRequestDTO.role,
      email: userRequestDTO.email,
    }),
  });

  if (!response.ok) {
    throw new Error("Incorrect old password");
  }
  return response;
}

export async function loginUser(username, hashPassword) {
  let connectionError = false;
  let response;
  try {
    response = await fetch(`${API_URL}/login?username=${username}`, {
      method: "POST",
      body: hashPassword,
    });
  } catch (error) {
    connectionError = true;
  }

  if (connectionError) {
    throw new Error("Server connection error");
  }

  const json = await response.json();

  if (json.message === "User was deactivated") {
    throw new Error(json.message);
  }

  if (!response.ok) {
    throw new Error("Invalid username or password");
  } else {
    localStorage.setItem("username", json.username);
    localStorage.setItem("role", json.role);
    localStorage.setItem("isFirstLogin", json.isFirstLogin);
  }
  return json;
}

export async function isFirstLogin(username) {
  await sleepNow(500);
  const response = await fetch(
    `${API_URL}/is-first-login?username=${username}`
  );
  const json = response.json();
  return json;
}

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/get-all-users`);
  const json = response.json();
  return json;
}

export async function modifyIsActive(id) {
  const response = await fetch(`${API_URL}/modify-user-activity?id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function requestNewPassword(username, securityCode) {
  const response = await fetch(
    `${API_URL}/request-password?username=${username}`,
    {
      method: "POST",
      body: securityCode,
    }
  );
  return response;
}
