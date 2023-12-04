import { Prisma } from "@prisma/client";
import handleError from "../base/express/handleError";
import prisma from "../clients/prismaClient";
import { CreateHotelDto } from "../src/dto/hotel/create-hotel.dto";

export async function getHotels(query: Prisma.HotelFindManyArgs = {}) {
  try {
    return await prisma.hotel.findMany({
      ...query,
    });
  } catch (error: any) {
    return handleError(error);
  }
}

export async function createHotel(dto: CreateHotelDto) {
  try {
    return await prisma.hotel.create({
      data: dto,
    });
  } catch (error: any) {
    return handleError(error);
  }
}
