"use client"
import { createContext, useContext, useState } from "react"
const ReservationContext = createContext()

 function ReservationProvider ({children}) {

    const initialState = {
        range: { from: null, to: null }
        
    }
    const [range, setRange] = useState(initialState);

    const resetRange = () => {
        setRange(initialState)
    }

    return (
        <ReservationContext.Provider value={{range, resetRange, setRange}}>
            {children}
        </ReservationContext.Provider>
    )
    
}

function useReservation (){
    const context = useContext(ReservationContext)
    if(context === undefined){
        throw new Error('useReservation must be used within a ReservationProvider')
    }
    return context
}

export {ReservationProvider, useReservation}