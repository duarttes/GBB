import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const FindAppointmentInSameDate =
    appointmentsRepository.findByDate(parsedDate);

  if (FindAppointmentInSameDate) {
    return response
      .status(400)
      .json({ msg: "This Appointment is already booked" });
  }

  const appointment = appointmentsRepository.create({provider, date: parsedDate});

  return response.json({ appointment });
});

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

export default appointmentsRouter;
