
import SubmitButton from "@/app/_components/SubmitButton";
import { UpdateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";


export default async function Page({params}) {
    // CHANGE
    
    const booking = await getBooking(params.reservationId);
    const { id,  cabinID } = booking;
    const cabin = await getCabin(cabinID);
    const maxCapacity = cabin.maxCapacity;
    const reservationId = id;
  
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Edit Reservation #{reservationId}
        </h2>
  
        <form action={UpdateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              defaultValue={booking.noOfGuests}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
  
          <div className="space-y-2">
            <label htmlFor="observations">
              Anything we should know about your stay?
            </label>
            <textarea
            defaultValue={booking.observations}
              name="observations"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>

          <input type="hidden" name="bookingId" value={reservationId} />
  
          <div className="flex justify-end items-center gap-6">
            <SubmitButton pendingLabel={"Updating Reservation"}>Update reservation</SubmitButton>
          </div>
        </form>
      </div>
    );
  }
  
  
  