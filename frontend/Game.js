import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Animated, Button, Image } from "react-native";
import Fish from "./Fish";
import FishTrash from "./FishTrash";

const Game = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  });

  const rodX = useState(new Animated.Value(0))[0]; // Initial horizontal position

  useEffect(() => {
    const startMovingRod = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rodX, {
            toValue: dimensions.width - 200, // Assume the boat has a width of 200
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(rodX, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    if (isGameActive) {
      startMovingRod();
    } else {
      rodX.setValue(0); // Reset the rod position to the left when game is not active
    }
  }, [isGameActive, dimensions.width]);

  const handleStartGame = () => {
    setIsGameActive(true);
  };

  const boatAndRodStyle = {
    position: "absolute",
    top: 50, // Adjust this value as needed
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
    height: 50, // The rod extends 50 units downwards from the boat
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
      {!isGameActive && <Button title="Start Game" onPress={handleStartGame} color="#841584" />}
      <Animated.View style={boatAndRodStyle}>
        <Image source={require("./assets/boat.png")} style={boatStyle} />
        <View style={rodStyle} />
      </Animated.View>
      <View style={{ ...styles.water, zIndex: -1, ...dimensions }} />
      {isGameActive && (
        <FishTrash
          image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif")}
        />
      )}
      {isGameActive && (
        <FishTrash
          image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif")}
        />
      )}
      {isGameActive && (
        <FishTrash
          image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif")}
        />
      )}
      {isGameActive && <FishTrash image={require("./assets/clownfishb.gif")} />}
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
});

export default Game;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Dimensions,
//   StyleSheet,
//   Animated,
//   Button,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import Fish from "./Fish";
// import FishTrash from "./FishTrash";

// const Game = () => {
//   const [isGameActive, setIsGameActive] = useState(false);
//   const [dimensions, setDimensions] = useState({
//     height: Dimensions.get("window").height,
//     width: Dimensions.get("window").width,
//   });

//   const rodX = useState(new Animated.Value(0))[0]; // Initial horizontal position
//   const rodY = useState(new Animated.Value(50))[0]; // Initial vertical position

//   useEffect(() => {
//     const startMovingRod = () => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(rodX, {
//             toValue: dimensions.width - 200, // Assume the boat has a width of 200
//             duration: 2000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(rodX, {
//             toValue: 0,
//             duration: 2000,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     };

//     if (isGameActive) {
//       startMovingRod();
//     } else {
//       rodX.setValue(0); // Reset the rod position to the left when game is not active
//       rodY.setValue(50); // Reset the rod to the initial vertical position when game is not active
//     }
//   }, [isGameActive, dimensions.width]);

//   const handleStartGame = () => {
//     setIsGameActive(true);
//   };

//   const handlePressAnywhere = () => {
//     if (isGameActive) {
//       Animated.timing(rodY, {
//         toValue: dimensions.height - 150, // Adjust 150 to account for the height of the boat and the rod
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   const boatAndRodStyle = {
//     position: "absolute",
//     top: rodY, // Use animated value for vertical positioning
//     left: rodX, // Animated value for horizontal position
//     width: 200, // Boat's width
//     height: 250, // Total height including the rod
//     alignItems: "center", // Center the boat and rod within the view
//   };

//   const boatStyle = {
//     width: 200,
//     height: 200,
//   };

//   const rodStyle = {
//     width: 10,
//     height: 50, // The rod extends 50 units downwards from the boat
//     backgroundColor: "brown",
//     position: "absolute",
//     top: 200, // Position the rod at the bottom of the boat image
//   };

//   return (
//     <View
//       style={{
//         position: "relative",
//         height: dimensions.height,
//         width: dimensions.width,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {/* <TouchableOpacity
//         style={{
//           position: "relative",
//           height: dimensions.height,
//           width: dimensions.width,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         activeOpacity={1}
//         onPress={handlePressAnywhere}
//       > */}

//       {!isGameActive && <Button title="Start Game" onPress={handleStartGame} color="#841584" />}
//       <Animated.View style={boatAndRodStyle}>
//         <Image source={require("./assets/boat.png")} style={boatStyle} />
//         <View style={rodStyle} />
//       </Animated.View>
//       <View style={{ ...styles.water, zIndex: -1, ...dimensions }} />
//       {isGameActive && (
//         <FishTrash
//           image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif")}
//         />
//       )}
//       {isGameActive && (
//         <FishTrash
//           image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif")}
//         />
//       )}
//       {isGameActive && (
//         <FishTrash
//           image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif")}
//         />
//       )}
//       {isGameActive && <FishTrash image={require("./assets/clownfishb.gif")} />}
//       {/* </TouchableOpacity> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   water: {
//     backgroundColor: "blue",
//     opacity: 0.1,
//     position: "absolute",
//     left: 0,
//     top: 0,
//     margin: 0,
//     padding: 0,
//     height: "100%",
//     width: "100%",
//   },
// });

// export default Game;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Dimensions,
//   StyleSheet,
//   Animated,
//   Button,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import Fish from "./Fish";
// import FishTrash from "./FishTrash";

// const Game = () => {
//   const [isGameActive, setIsGameActive] = useState(false);
//   const [dimensions, setDimensions] = useState({
//     height: Dimensions.get("window").height,
//     width: Dimensions.get("window").width,
//   });

//   const rodX = useState(new Animated.Value(0))[0]; // Initial horizontal position
//   const rodHeight = useState(new Animated.Value(50))[0]; // Initial rod height

//   useEffect(() => {
//     const startMovingRod = () => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(rodX, {
//             toValue: dimensions.width - 200, // Assume the boat has a width of 200
//             duration: 2000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(rodX, {
//             toValue: 0,
//             duration: 2000,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     };

//     if (isGameActive) {
//       startMovingRod();
//     } else {
//       rodX.setValue(0); // Reset the rod position to the left when game is not active
//       rodHeight.setValue(50); // Reset the rod height when game is not active
//     }
//   }, [isGameActive, dimensions.width]);

//   const handleStartGame = () => {
//     setIsGameActive(true);
//   };

//   const handlePressAnywhere = () => {
//     if (isGameActive) {
//       Animated.timing(rodHeight, {
//         toValue: dimensions.height - 200, // Adjust to prevent rod from overlapping with boat controls
//         duration: 3000,
//         useNativeDriver: false, // 'false' because we're updating layout properties
//       }).start();
//     }
//   };

//   const boatAndRodStyle = {
//     position: "absolute",
//     top: 50,
//     left: rodX, // Animated value for horizontal position
//     width: 200, // Boat's width
//     height: rodHeight, // Use animated height for dynamic adjustment
//     alignItems: "center", // Center the boat and rod within the view
//   };

//   const boatStyle = {
//     width: 200,
//     height: 200,
//   };

//   const rodStyle = {
//     width: 10,
//     backgroundColor: "brown",
//     position: "absolute",
//     bottom: 0, // Start the rod at the bottom of the view
//   };

//   return (
//     <TouchableOpacity
//       style={{
//         position: "relative",
//         // height: dimensions.height,
//         // width: dimensions.width,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//       activeOpacity={1}
//       onPress={handlePressAnywhere}
//     >
//       {!isGameActive && <Button title="Start Game" onPress={handleStartGame} color="#841584" />}
//       <Animated.View style={boatAndRodStyle}>
//         <Image source={require("./assets/boat.png")} style={boatStyle} />
//         <Animated.View style={[rodStyle, { height: rodHeight }]} />
//       </Animated.View>
//       <View style={{ ...styles.water, zIndex: -1, ...dimensions }} />
//       {isGameActive && (
//         <FishTrash
//           image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif")}
//         />
//       )}
//       {isGameActive && (
//         <FishTrash
//           image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif")}
//         />
//       )}
//       {isGameActive && (
//         <FishTrash
//           image={require("./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif")}
//         />
//       )}
//       {isGameActive && <FishTrash image={require("./assets/clownfishb.gif")} />}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   water: {
//     backgroundColor: "blue",
//     opacity: 0.1,
//     position: "absolute",
//     left: 0,
//     top: 0,
//     margin: 0,
//     padding: 0,
//     height: "100%",
//     width: "100%",
//   },
// });

// export default Game;
