import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet, TouchableWithoutFeedback, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import SpriteSheet from "rn-sprite-sheet";
import { PaperProvider } from "react-native-paper";
import { Text, BottomNavigation } from "react-native-paper";
import Aquarium from "./Aquarium";
import Home from "./Home";
import Game from "./Game2";
import Scanner from "./Scanner";
import History from "./History";

const AquariumRoute = () => <Aquarium />;

const ScannerRoute = () => <Scanner />;

const HistoryRoute = () => <History />;

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "aquarium", title: "Aquarium", focusedIcon: "heart", unfocusedIcon: "heart-outline" },
    {
      key: "game",
      title: "Game",
      unfocusedIcon: "gamepad-variant-outline",
      focusedIcon: "gamepad-variant",
    },
    {
      key: "scanner",
      title: "Scan",
      unfocusedIcon: "camera-enhance-outline",
      focusedIcon: "camera-enhance",
    },
    {
      key: "history",
      title: "History",
      focusedIcon: "clipboard-text-clock",
      unfocusedIcon: "clipboard-text-clock-outline",
    },
  ]);
  const GameRoute = () => <Game setIndex={setIndex} />;

  const renderScene = BottomNavigation.SceneMap({
    aquarium: AquariumRoute,
    game: GameRoute,
    scanner: ScannerRoute,
    history: HistoryRoute,
  });

  return (
    <PaperProvider>
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View> */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 250,
    overflow: "hidden",
  },
});
