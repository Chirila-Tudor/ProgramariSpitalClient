const API_URL = "http://localhost:8080/appointment";

export async function createAppointment(appointmentRequestDTO, username) {
  const response = await fetch(
    `${API_URL}/createAppointment?username=${username}`,
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
        typeOfServices: appointmentRequestDTO.typeOfServices,
      }),
    }
  );
  return response;
}

export async function updateAppointment(id, appointmentUpdateDTO) {
  const response = await fetch(`${API_URL}/updateAppointment?id=${id}`, {
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
  const response = await fetch(`${API_URL}/getAllAppointments`);
  const json = response.json();
  return json;
}
export async function getAllFutureAppointments() {
  const response = await fetch(`${API_URL}/getFutureAppointments`);
  const json = response.json();
  return json;
}
export async function getAppointmentsByScheduledPerson(username) {
  const response = await fetch(
    `${API_URL}/getAppointmentForUser?username=${username}`
  );
  const json = await response.json();
  return json;
}

export async function getAppointmentsForDoctor(username) {
  const response = await fetch(
    `${API_URL}/getAllAppointmentsByDoctor?username=${username}`
  );
  const json = await response.json();
  return json;
}

export async function getAvailableTimes(chooseDate, idService, doctorUsername) {
  const response = await fetch(
    `${API_URL}/getAvailableTimes?chooseDate=${chooseDate}&idService=${idService}&doctorUsername=${doctorUsername}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch available times");
  }
  const json = await response.json();
  return json;
}

export async function getDoctorDateAvailability(
  chooseDate,
  idService,
  doctorUsername
) {
  const response = await fetch(
    `${API_URL}/getDateAvailability?chooseDate=${chooseDate}&idService=${idService}&doctorUsername=${doctorUsername}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch doctor date availability");
  }
  const json = await response.json();
  return json;
}
