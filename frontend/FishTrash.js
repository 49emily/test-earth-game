import React, { useState, useEffect } from "react";
import { Image, Dimensions } from "react-native";
import { Modal, Portal, Text, PaperProvider } from "react-native-paper";
import Constant from "./constants";

const FishTrash = ({ image, rodY, rodX, setIndex, deltaY }) => {
  const [state, setState] = useState({
    x: Math.random() * (Dimensions.get("window").width - Constant.image_width),
    y: 200 + Math.random() * (Dimensions.get("window").height - 400 - Constant.image_height),
    z: Math.random() * Constant.min_z,
    xVelocity: 4,
    yVelocity: 1,
    zVelocity: 0.1,
    xDirection: "right",
    yDirection: "down",
    zDirection: "in",
  });

  const [visible, setVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    const tick = () => {
      move();
      // if (Math.random() < Constant.chance_to_change_direction) {
      //   chooseRandomMovement();
      // }
    };

    const intervalId = setInterval(tick, Constant.tick_interval);
    return () => clearInterval(intervalId);
  }, [state]);

  const chooseRandomMovement = () => {
    setState((prevState) => ({
      ...prevState,
      xVelocity: Math.random() * Constant.max_x_velocity + 3,
      yVelocity: Math.random() * Constant.max_y_velocity,
      zVelocity: Math.random() * Constant.max_z_velocity,
      xDirection: Math.random() < 0.5 ? "left" : "right",
      yDirection: Math.random() < 0.5 ? "up" : "down",
      zDirection: Math.random() < 0.5 ? "in" : "out",
    }));
  };

  const move = () => {
    // console.log("rod");
    // console.log(rodX);
    // // console.log(rodY);
    // console.log("fish");
    // console.log(state.x);
    // console.log(state.y);
    console;
    if (
      rodY + 100 < state.y + 20 &&
      rodY + 100 > state.y - 20 &&
      rodX + 70 < state.x + 20 &&
      rodX + 70 > state.x - 20 &&
      deltaY > 0
    ) {
      console.log("WON");
      setVisible(true); // Show the modal when the player wins
      setIndex(0);
      return;
    }
    setState((prevState) => {
      let newX =
        prevState.x +
        (prevState.xDirection === "right" ? prevState.xVelocity : -prevState.xVelocity);
      let newY =
        prevState.y +
        (prevState.yDirection === "down" ? prevState.yVelocity : -prevState.yVelocity);
      let newZ =
        prevState.z + (prevState.zDirection === "in" ? -prevState.zVelocity : prevState.zVelocity);

      let newXDirection = prevState.xDirection;
      let newYDirection = prevState.yDirection;
      let newZDirection = prevState.zDirection;

      if (newX > Dimensions.get("window").width - Constant.image_width) {
        newXDirection = "left";
      } else if (newX < Constant.max_scale_factor * Constant.image_width) {
        newXDirection = "right";
      }

      if (newY > Dimensions.get("window").height - Constant.image_height - 200) {
        newYDirection = "up";
      } else if (newY < 200 + Constant.max_scale_factor * Constant.image_height) {
        newYDirection = "down";
      }

      if (newZ > -1) {
        newZDirection = "in";
      } else if (newZ < Constant.min_z) {
        newZDirection = "out";
      }

      return {
        ...prevState,
        x: newX,
        y: newY,
        z: newZ,
        xDirection: newXDirection,
        yDirection: newYDirection,
        zDirection: newZDirection,
      };
    });
  };

  return (
    <Image
      source={image}
      style={{
        position: "absolute",
        left: state.x,
        top: state.y,
        height: 50,
        width: 70,
        transform: [
          { scaleX: state.xDirection === "right" ? 1 : -1 },
          { scaleY: 2 - state.z / Constant.min_z },
        ],
      }}
    />
  );
};

export default FishTrash;
