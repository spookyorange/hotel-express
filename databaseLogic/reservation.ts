import { CreateReservationDto } from "../src/dto/reservation/create-reservation.dto";
import prisma from "../clients/prismaClient";
import handleError from "../base/express/handleError";
import { Prisma } from "@prisma/client";

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

export async function getReservations(
  query: Prisma.ReservationFindManyArgs = {}
) {
  try {
    const reservations = await prisma.reservation.findMany({
      ...query,
      include: {
        _count: { select: { ReservationAttendee: true } },
        ReservationAttendee: true,
      },
    });

    return reservations.map((reservation) => {
      return {
        ...reservation,
        _count: undefined,
        numberOfGuests: reservation._count.ReservationAttendee,
      };
    });
  } catch (error: any) {
    return handleError(error);
  }
}

export async function updateReservationById(
  id: number,
  data: Prisma.ReservationUpdateInput
) {
  try {
    return await prisma.reservation.update({
      where: {
        id,
      },
      data,
    });
  } catch (error: any) {
    return handleError(error);
  }
}
