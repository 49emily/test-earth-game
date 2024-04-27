import { Platform, useWindowDimensions } from "react-native";
import { Canvas, useImage, Image, Group, Text, matchFont } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  Easing,
  useFrameCallback,
  useDerivedValue,
  interpolate,
  useAnimatedReaction,
  runOnJS,
  cancelAnimation,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler";

const Game = () => {
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);
  const oceanBg = useImage(require("./frontend/assets/ocean.png"));
  const boatImage = useImage(require("./frontend/assets/boat.png"));
  const fishImage = useImage(require("./frontend/assets/boat.png"));

  const gameOver = useSharedValue(false);
  const fishX = useSharedValue(width); // Fish start from the right
  const boatX = width / 2;
  const boatY = 80; // Static position for the boat

  const fishSpeed = useDerivedValue(() => {
    return interpolate(score, [0, 20], [1.5, 3], { extrapolateRight: "clamp" });
  });

  const fish = useDerivedValue(() => [
    { x: fishX.value, y: height - 120, w: 50, h: 30 }, // Fish position and size
  ]);

  useEffect(() => {
    moveFish();
  }, []);

  const moveFish = () => {
    fishX.value = withTiming(
      -150,
      {
        duration: 3000 / fishSpeed.value,
        easing: Easing.linear,
      },
      () => {
        fishX.value = width; // Reset fish position
        moveFish();
      }
    );
  };

  // Collision detection for catching fish
  useAnimatedReaction(
    () => fishX.value,
    (currentValue, previousValue) => {
      if (previousValue > boatX && currentValue <= boatX) {
        runOnJS(setScore)(score + 1); // Increment score when a fish is caught
      }
    }
  );

  useAnimatedReaction(
    () => gameOver.value,
    (currentValue) => {
      if (currentValue) {
        cancelAnimation(fishX);
      }
    }
  );

  const restartGame = () => {
    fishX.value = width;
    gameOver.value = false;
    runOnJS(setScore)(0);
    moveFish();
  };

  const gesture = Gesture.Tap().onStart(() => {
    if (gameOver.value) {
      restartGame();
    } else {
      // Additional functionality (like lowering the fishing line) could be added here
    }
  });

  const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
  const fontStyle = { fontFamily, fontSize: 40, fontWeight: "bold" };
  const font = matchFont(fontStyle);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          <Image image={oceanBg} width={width} height={height} fit={"cover"} />
          <Image image={boatImage} x={boatX - 25} y={boatY} width={50} height={50} />
          {fish.value.map((f, index) => (
            <Image key={index} image={fishImage} {...f} />
          ))}
          <Text x={width / 2 - 30} y={50} text={score.toString()} font={font} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Game;
