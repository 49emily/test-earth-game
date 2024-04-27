import React, { useRef } from "react";
import SpriteSheet from "rn-sprite-sheet";
import { View, Image, StyleSheet, TouchableWithoutFeedback, Button } from "react-native";

export default Home = () => {
  const ref = useRef(null);
  const play = () => {
    ref.current.play({
      type: "walk", // (required) name of the animation (name is specified as a key in the animation prop)
      loop: true,
      fps: 12,
      // fps = 24, // frames per second
      // loop = false, // if true, replays animation after it finishes
      // resetAfterFinish = false, // if true, the animation will reset back to the first frame when finished; else will remain on the last frame when finished
      // onFinish = () => {} // called when the animation finishes; will not work when loop === true
    });
  };

  const stop = () => {
    ref.current.stop();
  };

  return (
    <View style={styles.container}>
      <SpriteSheet
        ref={ref}
        source={require("./assets/sprites.jpg")}
        columns={5}
        rows={1}
        height={300} // set either, none, but not both
        // width={200}
        // frameHeight={50} // manually set size of your sprite
        // frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
        // offsetX={0}
        // offsetY={0}
        // imageStyle={{ marginTop: -1 }}
        animations={{
          walk: [0, 1, 2, 3, 4],
          // appear: Array.from({ length: 15 }, (v, i) => i + 18),
          // die: Array.from({ length: 21 }, (v, i) => i + 33),
        }}
      />

      <Button onPress={play} title="Play" />
      <Button onPress={stop} title="Stop" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  //   image: {
  //     height: 300,
  //     width: 250,
  //     overflow: "hidden",
  //   },
});
