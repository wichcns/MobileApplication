import { GoogleSignin } from '@react-native-google-signin/google-signin';

const GOOGLE_WEB_CLIENT =
  '909128229498-ggqlvh72f58o98a5ieb99nnjcg204kin.apps.googleusercontent.com';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT,
    forceCodeForRefreshToken: true,
  });
};
