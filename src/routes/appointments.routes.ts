import { Router, request, response } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointment from "../models/Appointment";

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const FindAppointmentInSameDate = appointments.find((appointment) =>
    isEqual(parsedDate, appointment.date)
  );

  if (FindAppointmentInSameDate) {
    return response
      .status(400)
      .json({ msg: "This Appointment is already booked" });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json({ appointment });
});

appointmentsRouter.get("/", (request, response) => {
  return response.json(appointments);
});
export default appointmentsRouter;
