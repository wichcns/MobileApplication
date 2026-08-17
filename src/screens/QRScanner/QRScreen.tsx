import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

export default function QRScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="close" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Scan QR Code</Text>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* CAMERA AREA */}

      <View style={styles.cameraBox}>
        {/* MOCK CAMERA */}

        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          <View style={styles.scanLine} />
        </View>

        <Text style={styles.cameraText}>Place QR Code inside the frame</Text>
      </View>

      {/* BOTTOM INFO */}

      <View style={styles.bottom}>
        <Text style={styles.description}>
          Scan charger QR Code to start charging
        </Text>

        <TouchableOpacity style={styles.galleryButton}>
          <Ionicons name="images-outline" size={22} color="#111827" />

          <Text style={styles.galleryText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanFrame: {
    width: 260,
    height: 260,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#00C878',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },

  scanLine: {
    width: '85%',
    height: 3,
    backgroundColor: '#00C878',
  },

  cameraText: {
    marginTop: 30,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  bottom: {
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  description: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    marginBottom: 20,
  },

  galleryButton: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryText: {
    marginLeft: 8,
    fontWeight: '700',
    color: '#111827',
  },
});
