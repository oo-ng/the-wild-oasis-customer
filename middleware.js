
import { withAuth } from "next-auth/middleware";


export default withAuth(
  function middleware(req) {
    console.log("Token in Middleware:", req.nextauth.token); 
  },
  {
    callbacks: {
      // authorized: ({ token }) => !!token, // Only allow access if user has a token
      authorized: ({ token }) => {
        console.log("Authorized Callback - Token:", token);
        return !!token;
      }
    },
    pages:{  
        signIn:"/login" //Redirect unathenticated users to login page
    }
  }
)



export const config = { matcher: ["/account"] }
