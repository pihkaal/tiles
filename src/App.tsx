import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";

import { Puzzle, type TilesSet } from "./components/Puzzle";

const SMALL = false;

const tiles: TilesSet = SMALL
  ? [
      [require("./tiles/grass.png"), require("./tiles/grass.png")],
      [require("./tiles/beach.png"), require("./tiles/beach.png")],
    ]
  : [
      [
        require("./tiles/roadES.png"),
        require("./tiles/roadEW.png"),
        require("./tiles/roadSW.png"),
      ],
      [
        require("./tiles/beach.png"),
        require("./tiles/beach.png"),
        require("./tiles/beach.png"),
      ],
      [
        require("./tiles/dirtDouble.png"),
        require("./tiles/dirtDouble.png"),
        require("./tiles/dirtDouble.png"),
      ],
    ];

const PADDING = 20;

const App = () => {
  const { width: screenWidth } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Puzzle width={screenWidth - PADDING * 2} tiles={tiles} />
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
});

registerRootComponent(App);
