const API_URL = "http://localhost:8080/hall";

export async function createHall(hallRequestDTO) {
  const response = await fetch(`${API_URL}/add-hall`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      room: hallRequestDTO.room,
      equipment: hallRequestDTO.equipment,
      doctorUsername: hallRequestDTO.doctorUsername,
    }),
  });
  return response;
}

export async function getAllHalls() {
  const response = await fetch(`${API_URL}/get-all-halls`);
  const json = response.json();
  return json;
}

export async function deleteHall(hallId) {
  return fetch(`${API_URL}/delete-hall?id=${hallId}`, {
    method: "DELETE",
  });
}

export async function updateHospitalHall(hallId, requestData) {
  try {
    const response = await fetch(`${API_URL}/update-hall?hallId=${hallId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to update hospital hall");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error updating hospital hall:", error);
    throw error;
  }
}

export async function getHospitalHall(hallId) {
  const response = await fetch(`${API_URL}/getHall?hallId=${hallId}`);
  const json = await response.json();
  return json;
}
