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
        typeOfServices: appointmentRequestDTO.typeOfService,
      }),
    }
  );
  return response;
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
