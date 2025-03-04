import { useSession } from "next-auth/react";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getServerSession } from "next-auth";
import LoginMessage from "./LoginMessage";

export default async function Reservations ({cabin}) {
    const session = await getServerSession()
    console.log(session)
    
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);
    
    return(
        <div className='grid grid-cols-2 border-primary-800 min-h-[400px] '>
        
          <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
          {session?.user ? <ReservationForm cabin={cabin} user={session?.user}/> : <LoginMessage/>}
        </div>
        
    )
}
