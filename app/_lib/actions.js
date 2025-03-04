"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { supabase } from "./supabase"
import { revalidatePath } from "next/cache"
import { getBookings } from "./data-service"
import { redirect } from "next/navigation"

export async function updateProfile (formData){
    const session = await  getServerSession(authOptions)
    console.log("session", session)
    console.log(formData)
    if(!session){
        throw new Error("You must be logged in to update your profile")
    }
    const nationalID = formData.get("nationalID")
    const nationalitydata = formData.get("nationality")
   
    const datan = nationalitydata.split("%")
    const nationality = datan[0]
    const countryFlag = datan[1]

    const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;


    if(!nationalIDRegex.test(nationalID)){
        throw new Error("Invalid National ID")
    }

    const updateData = {
        nationality, countryFlag, nationalID
    }
    console.log("updateData", updateData, session.user.id, typeof(session.user.id))


   const { data, error } = await supabase
       .from('Guests')
       .update(updateData)
       .eq('id', session?.user?.id)
       .select()
       .single();
   
     if (error) {
        console.error("sUPABASE Error",error);
       throw new Error('Guest could not be updated');
     }
     revalidatePath("/account/profile")
     return data;
}

export async function deleteReservation(bookingId){
    const session = await  getServerSession(authOptions)
    if(!session){
        throw new Error("You must be logged in to delete your booking")
    }

    const guestBookings = await getBookings(session?.user?.id)
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    console.log("guestBookingIds", guestBookingIds)
    const { data, error } = await supabase.from('Bookings').delete().eq('id', bookingId);
    
    if(guestBookingIds.includes(bookingId) === false){
        throw new Error("You are not allowed to delete this booking")
    }

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations")
    return data;

}

export async function UpdateReservation(formData){
    console.log("formData", formData)
    const bookingId = formData.get("bookingId")
    const session = await getServerSession(authOptions)
    if(!session){
        throw new Error("You must be logged in to delete your booking")
    }

    const guestBookings = await getBookings(session?.user?.id)
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    console.log("guestBookingIds", guestBookingIds)
    if(guestBookingIds.includes(Number(bookingId)) === false){
        throw new Error("You are not allowed to delete this booking")
    }

    const updatedFields = {
        noOfGuests: formData.get("numGuests"),
        observations: formData.get("observations").slice(0,1000)
    }
    
    const { data, error } = await supabase
    .from('Bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
    
    

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    revalidatePath(`/account/reservations/edit/${bookingId}`)
    revalidatePath(`/account/reservations`)
    redirect('/account/reservations')
    return data;

}