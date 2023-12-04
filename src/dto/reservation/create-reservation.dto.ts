import { CreateGuestDto } from "./create-guest.dto";

export interface CreateReservationDto {
  hotelId: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  guests: CreateGuestDto[];
}
