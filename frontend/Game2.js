import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import Fish from "./Fish";
import FishTrash from "./FishTrash";
import { TouchableHighlight } from "react-native";

const Game = ({ setIndex }) => {
  const [isGameActive, setIsGameActive] = useState(true);
  const [isRodGoing, setIsRodGoing] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  });

  //   const rodX = useState(new Animated.Value(0))[0]; // Initial horizontal position
  const [deltaY, setDeltaY] = useState(10);
  const [deltaX, setDeltaX] = useState(5);
  const [rodY, setRodY] = useState(0);
  const [rodX, setRodX] = useState(0);

  //   useEffect(() => {
  //     const startMovingRod = () => {
  //       Animated.loop(
  //         Animated.sequence([
  //           Animated.timing(rodX, {
  //             toValue: dimensions.width - 200, // Assume the boat has a width of 200
  //             duration: 2000,
  //             useNativeDriver: false,
  //           }),
  //           Animated.timing(rodX, {
  //             toValue: 0,
  //             duration: 2000,
  //             useNativeDriver: false,
  //           }),
  //         ])
  //       ).start();
  //     };

  //     if (isGameActive) {
  //       startMovingRod();
  //     } else {
  //       rodX.setValue(0); // Reset the rod position to the left when game is not active
  //     }
  //   }, [isGameActive, dimensions.width]);

  const handleStartGame = () => {
    setIsGameActive(true);
    moveBoat();
  };

  const moveBoat = () => {
    setRodX(rodX + deltaX);
  };

  const moveRod = () => {
    setRodY(rodY + deltaY);
  };

  const onPress = () => {
    setIsRodGoing(true);
  };

  useEffect(() => {
    if (isGameActive) {
      if (rodY > dimensions.height - 400) {
        setDeltaY(-10);
      }
      if (rodX > dimensions.width - 200) {
        setDeltaX(-5);
      }

      if (rodX < 0) {
        setDeltaX(5);
      }

      if (rodY < 0) {
        setIsRodGoing(false);
        setRodY(0);
        setDeltaY(10);
      }
      const tick = () => {
        moveBoat();
        if (isRodGoing) {
          moveRod();
        }
      };

      const intervalId = setInterval(tick, 20);
      return () => clearInterval(intervalId);
    }
  }, [isGameActive, isRodGoing, rodX, rodY]);

  const boatAndRodStyle = {
    position: "absolute",
    top: 100, // Adjust this value as needed
    left: rodX, // Animated value for horizontal position
    width: 200, // Boat's width
    height: 250, // Total height including the rod
    alignItems: "center", // Center the boat and rod within the view
  };

  const boatStyle = {
    width: 200,
    height: 200,
  };

  const rodStyle = {
    width: 10,
    height: 50 + rodY, // The rod extends 50 units downwards from the boat
    backgroundColor: "brown",
    position: "absolute",
    top: 100, // Start the rod right where the boat ends
  };

  return (
    <View
      style={{
        position: "relative",
        height: dimensions.height,
        width: dimensions.width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {!isGameActive && <Button title="Start Game" onPress={handleStartGame} color="#841584" />} */}
      {isGameActive && (
        <>
          {/* <ImageBackground
            source={require("./assets/ocean-background.png")}
            resizeMode="cover"
            style={styles.image}
          > */}

          <TouchableHighlight onPress={onPress}>
            <View
              style={{
                position: "relative",
                height: dimensions.height,
                width: dimensions.width,
              }}
            >
              <ImageBackground
                source={require("./assets/ocean-fishing-background.jpeg")}
                resizeMode="cover"
                style={styles.image}
              >
                {/* {fishList.map((fish) => {
                return (
                  <FishTrash
                    setIndex={setIndex}
                    rodY={rodY}
                    image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif")}
                  />
                );
              })} */}
                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/fish-d.gif")}
                />

                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif")}
                />

                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif")}
                />

                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/clownfishb.gif")}
                />

                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif")}
                />

                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/chips.png")}
                />

                <FishTrash
                  setIndex={setIndex}
                  rodY={rodY}
                  deltaY={deltaY}
                  rodX={rodX}
                  image={require("./assets/water-bottle-2.png")}
                />

                <Animated.View style={boatAndRodStyle}>
                  <Image source={require("./assets/boat.png")} style={boatStyle} />
                  <View style={rodStyle} />
                </Animated.View>
              </ImageBackground>
            </View>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  water: {
    backgroundColor: "blue",
    opacity: 0.1,
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

export default Game;
