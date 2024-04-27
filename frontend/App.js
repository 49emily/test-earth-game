import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet, TouchableWithoutFeedback, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import SpriteSheet from "rn-sprite-sheet";
import { PaperProvider } from "react-native-paper";
import { Text, BottomNavigation } from "react-native-paper";
import Aquarium from "./Aquarium";
import Home from "./Home";
import Game from "./Game";

const MusicRoute = () => <Aquarium />;

const AlbumsRoute = () => <Game />;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "music", title: "Favorites", focusedIcon: "heart", unfocusedIcon: "heart-outline" },
    { key: "albums", title: "Albums", focusedIcon: "album" },
    { key: "recents", title: "Recents", focusedIcon: "history" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
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
