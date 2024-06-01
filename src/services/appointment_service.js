const API_URL = "http://localhost:8080/appointment";

export async function createAppointment(appointmentRequestDTO, username) {
  const response = await fetch(
    `${API_URL}/create-appointment?username=${username}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: appointmentRequestDTO.email,
        firstName: appointmentRequestDTO.firstName,
        lastName: appointmentRequestDTO.lastName,
        phoneNumber: appointmentRequestDTO.phoneNumber,
        dateOfBirth: appointmentRequestDTO.dateOfBirth,
        chooseDate: appointmentRequestDTO.chooseDate,
        appointmentHour: appointmentRequestDTO.appointmentHour,
        periodOfAppointment: appointmentRequestDTO.periodOfAppointment,
        hospitalHallName: appointmentRequestDTO.hospitalHallName,
        typeOfServices: appointmentRequestDTO.typeOfService,
      }),
    }
  );
  return response;
}

export async function updateAppointment(id, appointmentUpdateDTO) {
  const response = await fetch(`${API_URL}/update-appointment?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chooseDate: appointmentUpdateDTO.chooseDate,
      appointmentHour: appointmentUpdateDTO.appointmentHour,
      periodOfAppointment: appointmentUpdateDTO.periodOfAppointment,
    }),
  });
  return response;
}

export async function getAppointment(id) {
  const response = await fetch(`${API_URL}/getAppointment?id=${id}`);
  const json = await response.json();
  return json;
}

export async function getAllAppointments() {
  const response = await fetch(`${API_URL}/get-all-appointments`);
  const json = response.json();
  return json;
}
export async function getAllFutureAppointments() {
  const response = await fetch(`${API_URL}/future-appointments`);
  const json = response.json();
  return json;
}
