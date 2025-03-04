import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import '@/app/_styles/globals.css'

import {Josefin_Sans} from 'next/font/google'
import { ReservationProvider } from "./_context/ReservationContext";
import SessionProviderWrapper from "./_context/SessionProviderWrapper";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome To The Wild Oasis"
  }, description: " Luxurious cabin hotel."
}

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: "swap",


})
console.log(josefin)

export default function RootLayout ({children, pageProps }) {

  return(
    <html lang="en">
        
      <body className={`${josefin.className} relative flex flex-col text-primary-50 min-h-screen bg-primary-950`}>
        <SessionProviderWrapper>
        <Header/>
        <div className='grid  flex-1 px-8 py-12'>
          <main className='max-w-7xl  w-full mx-auto'>
              <ReservationProvider>
                {children}
              </ReservationProvider>
          </main>
        </div>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
