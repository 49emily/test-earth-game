import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, ImageBackground } from "react-native";
import Fish from "./Fish";

const Aquarium = () => {
  const [dimensions, setDimensions] = useState({
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  });

  // useEffect(() => {
  //   const handleResize = () => {
  //     setDimensions({
  //       height: Dimensions.get("window").height,
  //       width: Dimensions.get("window").width,
  //     });
  //   };

  //   Dimensions.addEventListener("change", handleResize);
  //   return () => {
  //     Dimensions.removeEventListener("change", handleResize);
  //   };
  // }, []);

  return (
    <View
      style={{
        position: "relative",
        height: dimensions.height,
        width: dimensions.width,
      }}
    >
      <ImageBackground
        source={require("./assets/ocean-background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <View style={{ ...dimensions, ...styles.water, zIndex: -1 }} />
        <View style={{ ...dimensions, ...styles.water, zIndex: -10 }} />
        <View style={{ ...dimensions, ...styles.water, zIndex: -20 }} />
        <View style={{ ...dimensions, ...styles.water, zIndex: -30 }} />
        <View style={{ ...dimensions, ...styles.water, zIndex: -40 }} />
        <View style={{ ...dimensions, ...styles.water, zIndex: -50 }} />
        <View style={{ ...dimensions, ...styles.water, zIndex: -60 }} /> */}
        {/* Similar Views for different zIndex */}
        <Fish
          image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif")}
        />
        <Fish
          image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif")}
        />
        <Fish
          image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif")}
        />
        <Fish image={require("./assets/clownfishb.gif")} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  water: {
    opacity: 0.1,
    zIndex: -1,
    position: "absolute",
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
  },
  image: {
    zIndex: -60,
    flex: 1,
    justifyContent: "center",
  },
});

export default Aquarium;
