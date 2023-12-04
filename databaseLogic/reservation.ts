import { CreateReservationDto } from "../src/dto/reservation/create-reservation.dto";
import prisma from "../clients/prismaClient";
import handleError from "../base/express/handleError";

export async function createReservation(dto: CreateReservationDto) {
  try {
    return await prisma.reservation.create({
      data: {
        checkIn: dto.checkInDate,
        checkOut: dto.checkOutDate,
        hotelId: dto.hotelId,
        reservationCreatorId: dto.userId,
        ReservationAttendee: {
          createMany: {
            data: dto.guests,
          },
        },
      },
    });
  } catch (error: any) {
    return handleError(error);
  }
}
