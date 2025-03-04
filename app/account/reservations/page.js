
import ReservationCard from '@/app/_components/ReservationCard.js'
import ReservationList from '@/app/_components/ReservationList';
import { getBookings } from '@/app/_lib/data-service';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
export const metadata = {
  title:"Reservations"
}

export default async function Page() {
  // CHANGE
  const session = await getServerSession(authOptions)
  const bookings = await getBookings(session?.user?.id);
  console.log("test", bookings)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
