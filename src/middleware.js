import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    // console.log(req.auth);
    // console.log(req.nextUrl);
    if (!req.auth) {
        console.log('no autenticado');

        let callbackUrl = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          callbackUrl += req.nextUrl.search;
        }
    
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(req.nextUrl.origin
            + `/auth/login?callbackUrl=${encodedCallbackUrl}`)
    }
    
})


export const config = {
    matcher: [
        "/dashboards(.*)",
        "/databases(.*)",
        "/",
    ],
};