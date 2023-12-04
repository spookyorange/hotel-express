import handleError from "../base/express/handleError";
import prisma from "../clients/prismaClient";
import { CreateHotelDto } from "../src/dto/hotel/create-hotel.dto";

export async function createHotel(dto: CreateHotelDto) {
  try {
    return await prisma.hotel.create({
      data: dto,
    });
  } catch (error: any) {
    return handleError(error);
  }
}
