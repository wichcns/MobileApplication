import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

const IOS_GOOGLE_WEB_CLIENT =
  '458026609639-ttvbs5d5kihmn2nv01lsgs2mdat1e1pt.apps.googleusercontent.com';

const ANDROID_GOOGLE_WEB_CLIENT =
  '909128229498-ggqlvh72f58o98a5ieb99nnjcg204kin.apps.googleusercontent.com';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      Platform.OS === 'ios'
        ? IOS_GOOGLE_WEB_CLIENT
        : ANDROID_GOOGLE_WEB_CLIENT,
    forceCodeForRefreshToken: true,
  });
};
