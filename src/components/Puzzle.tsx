import { Fragment } from "react";
import { Image, StyleSheet, View } from "react-native";

export type TilesSet = number[][];

const TILE_WIDTH = 100;
const TILE_UPPER_HEIGHT = 50;
const TITLE_LOWER_HEIGHT = 15;

export const Puzzle = (props: { width: number; tiles: TilesSet }) => {
  const scaleFactor = (props.width / (TILE_WIDTH * props.tiles[0].length)) * 1;

  const tileWidth = TILE_WIDTH * scaleFactor;
  const tileUpperHeight = TILE_UPPER_HEIGHT * scaleFactor;
  const tileLowerHeight = TITLE_LOWER_HEIGHT * scaleFactor;
  const tileHeight = tileLowerHeight + tileUpperHeight;

  const width = props.tiles[0].length * tileWidth;
  const height =
    props.tiles.length * tileHeight -
    (props.tiles.length - 1) * tileLowerHeight;

  const tiles = props.tiles.map(row => [...row].reverse());

  return (
    <View
      style={{
        ...styles.container,
        width,
        height,
      }}
    >
      {tiles.map((row, y) => (
        <Fragment key={y}>
          {row.map((tile, x) => {
            const left = width / 2 - (x / 2 - y / 2 + 0.5) * tileWidth;
            const top = (y / 2 + x / 2) * tileUpperHeight;

            return (
              <Image
                key={x}
                source={tile}
                style={{
                  ...styles.tile,
                  top,
                  left,
                  width: tileWidth,
                  height: tileHeight,
                }}
              />
            );
          })}
        </Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tile: {
    position: "absolute",
    flex: 1,
  },
});
