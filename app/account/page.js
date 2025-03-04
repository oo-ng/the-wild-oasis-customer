"use client"
import { useSession } from "next-auth/react";

export default function Page() { 
    const { data: session } = useSession(); 
    console.log(session)
    
    return (
        <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
            {session?.user ? `Welcome, ${session.user.name}` : "Loading..."}
        </h2>
    );
}
