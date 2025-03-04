
import { createGuest, getGuest } from "@/app/_lib/data-service";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
export const authOptions =  {
    providers: [
        Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
      })
    ],
    callbacks:{
            
      async signIn({user, account, profile}){
        try{
          // console.log("User", user)
          const existingGuest = await getGuest(user.email)
          
          if(existingGuest){
            // console.log("Guest exists", existingGuest)
          }else{
            const newGuest = await createGuest({name:user.name, emailAddress:user.email})
            // console.log("New Guest Created:", newGuest);
          }
          return true
        }catch(err){
          console.error("Error in signIn callback:", err);
          // console.log("Error in signIn callback:", err);
          return false
        }
      },
      
      async jwt({token, user}){
        if(user){
          const guest = await getGuest(user.email)
          if(guest){
            token.id = guest.id
          }
        }
        return token
      },

      async session({session, token}){
        // console.log("Session", session)
        // console.log("token", token)
        if (token?.id) {
          session.user.id = token.id; // Attach user ID from JWT to session
        }
        // console.log("Session after:", session);
        return session
      },
    },
      
    }

const handler = NextAuth(authOptions)
export { handler, handler as GET, handler as POST }
