import { API_URL, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, CLIENT_URL } from "@/env";
import Elysia from "elysia";

const redirect_uri = `${API_URL}/auth/google/callback`;

const googleAuthRouter = new Elysia({ prefix: "/google" }).get('/login', ({ redirect }) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?`
    + new URLSearchParams({
      client_id: AUTH_GOOGLE_ID,
      redirect_uri,
      scope: "profile email",
      response_type: "code",
      // access_type: "offline" // Optional for refresh tokens
    }).toString();
  return { redirectTo: googleAuthUrl }
})
  .get('/callback', async ({ query: { code }, set, redirect, cookie: { user } }) => {

    if (!code) {
      set.status = 400;
      return "Authorization code missing!";
    }

    const tokenUrl = "https://oauth2.googleapis.com/token";

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code,
        client_id: AUTH_GOOGLE_ID, // Replace with your client ID
        client_secret: AUTH_GOOGLE_SECRET, // Replace with your client secret
        redirect_uri,
        grant_type: "authorization_code"
      }).toString()
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      set.status = 500;
      return "Failed to exchange code for tokens!";
    }

    const accessToken = tokenData.access_token;

    // Use the access token to fetch user profile information (optional)
    const userInfoUrl = "https://www.googleapis.com/userinfo/v2/me";
    const userInfoResponse = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const userInfo = await userInfoResponse.json();

    user.set({
      value: accessToken,
      path: "/",
      domain: "jojit.in",
      maxAge: 60 * 60 * 24 * 7,
    })

    // Redirect to your application's home page or protected resource after successful authentication
    return redirect(CLIENT_URL);
  })


const authRouter = new Elysia({ prefix: '/auth' }).get('/', ({ cookie: { user } }) => {
  console.log("user >> ", user);
  return user.value as string
}).use(googleAuthRouter)


export default authRouter;