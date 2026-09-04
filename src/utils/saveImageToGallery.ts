import { PermissionsAndroid, Platform } from 'react-native';

import {
  CameraRoll,
  iosRequestAddOnlyGalleryPermission,
} from '@react-native-camera-roll/camera-roll';

export class GalleryPermissionError extends Error {
  constructor() {
    super('Photo library permission was not granted');
    this.name = 'GalleryPermissionError';
  }
}

async function ensureGalleryWritePermission(): Promise<void> {
  if (Platform.OS === 'ios') {
    const status = await iosRequestAddOnlyGalleryPermission();

    if (status !== 'granted' && status !== 'limited') {
      throw new GalleryPermissionError();
    }

    return;
  }

  if (Platform.OS !== 'android' || Number(Platform.Version) >= 29) {
    return;
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const alreadyGranted = await PermissionsAndroid.check(permission);

  if (alreadyGranted) {
    return;
  }

  const result = await PermissionsAndroid.request(permission);

  if (result !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new GalleryPermissionError();
  }
}

export async function saveImageToGallery(uri: string): Promise<string> {
  if (!uri) {
    throw new Error('A valid local image URI is required');
  }

  await ensureGalleryWritePermission();

  const asset = await CameraRoll.saveAsset(uri, {
    type: 'photo',
    ...(Platform.OS === 'android' ? { album: 'GSB EV Receipts' } : {}),
  });
  const savedUri = asset?.node?.image?.uri;

  if (!savedUri) {
    throw new Error('The photo library did not return a saved asset');
  }

  return savedUri;
}
