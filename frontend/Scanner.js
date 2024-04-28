import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { Camera, useCameraPermission, useCameraDevice } from "react-native-vision-camera";
import { Camera } from "expo-camera";
import { ActivityIndicator, Colors } from "react-native-paper";
const fetch = require("node-fetch");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [tookPhoto, setTookPhoto] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { base64: true };
      let photo = await cameraRef.takePictureAsync(options);
      console.log(photo);
      setPhoto(photo.base64);
      const body = { imageBase64: photo.base64 };
      const response = await fetch("http://localhost:3000/api/v1/peepoo", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);

      setTookPhoto(true);
      await sleep(4000);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
        <View style={styles.buttonContainer}>
          {tookPhoto && <ActivityIndicator animating={true} />}
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
      </Camera>
      {/* {photo && <Image source={{ uri: photo }} style={styles.preview} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "transparent",
    flexDirection: "row",
    bottom: 20,
    left: "40%",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: 100,
    width: 100,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  innerCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
});
