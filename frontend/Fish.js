import React, { useState, useEffect } from "react";
import { Image, Dimensions } from "react-native";
import Constant from "./constants";

const Fish = ({ image }) => {
  const [state, setState] = useState({
    x:
      Math.random() *
      (Dimensions.get("window").width - Constant.max_scale_factor * Constant.image_width),
    y:
      Math.random() *
      (Dimensions.get("window").height - Constant.max_scale_factor * Constant.image_height),
    z: Math.random() * Constant.min_z,
    xVelocity: 2,
    yVelocity: 1,
    zVelocity: 0.1,
    xDirection: "right",
    yDirection: "down",
    zDirection: "in",
  });

  useEffect(() => {
    const tick = () => {
      move();
      if (Math.random() < Constant.chance_to_change_direction) {
        chooseRandomMovement();
      }
    };

    const intervalId = setInterval(tick, Constant.tick_interval);
    return () => clearInterval(intervalId);
  }, [state]);

  const chooseRandomMovement = () => {
    setState((prevState) => ({
      ...prevState,
      xVelocity: Math.random() * Constant.max_x_velocity,
      yVelocity: Math.random() * Constant.max_y_velocity,
      zVelocity: Math.random() * Constant.max_z_velocity,
      xDirection: Math.random() < 0.5 ? "left" : "right",
      yDirection: Math.random() < 0.5 ? "up" : "down",
      zDirection: Math.random() < 0.5 ? "in" : "out",
    }));
  };

  const move = () => {
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

      if (
        newX >
        Dimensions.get("window").width - Constant.max_scale_factor * Constant.image_width
      ) {
        newXDirection = "left";
      } else if (newX < Constant.max_scale_factor * Constant.image_width) {
        newXDirection = "right";
      }

      if (
        newY >
        Dimensions.get("window").height - Constant.max_scale_factor * Constant.image_height
      ) {
        newYDirection = "up";
      } else if (newY < Constant.max_scale_factor * Constant.image_height) {
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
        transform: [
          { scaleX: state.xDirection === "right" ? 1 : -1 },
          { scaleY: 2 - state.z / Constant.min_z },
        ],
        zIndex: Math.round(state.z),
      }}
    />
  );
};

export default Fish;
