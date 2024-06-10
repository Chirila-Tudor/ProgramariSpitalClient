const API_URL = "http://localhost:8080/service";

export async function addService(typeOfServiceRequestDTO) {
  const response = await fetch(`${API_URL}/addService`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service: typeOfServiceRequestDTO.service,
      doctorsWhoCanPerformService:
        typeOfServiceRequestDTO.doctorsWhoCanPerformService,
    }),
  });
  return response;
}

export async function getAllServices() {
  const response = await fetch(`${API_URL}/getAllServices`);
  const json = response.json();
  return json;
}

export async function getService(serviceId) {
  const response = await fetch(`${API_URL}/getService?serviceId=${serviceId}`);
  const json = await response.json();
  return json;
}

export async function getDoctorsByTypeOfService(serviceId) {
  try {
    const response = await fetch(
      `${API_URL}/getDoctorsByService/${serviceId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching doctors:", error);
  }
}
