const API_URL = "http://localhost:8080/service";

export async function addService(typeOfServiceRequestDTO) {
  const response = await fetch(`${API_URL}/add`, {
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
  const response = await fetch(`${API_URL}/get-all-services`);
  const json = response.json();
  return json;
}

export async function getService(serviceId) {
  const response = await fetch(`${API_URL}/getService?serviceId=${serviceId}`);
  const json = await response.json();
  return json;
}
