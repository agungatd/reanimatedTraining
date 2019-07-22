import React from "react";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const {
  cond,
  eq,
  add,
  call,
  set,
  Value,
  event,
  interpolate,
  Extrapolate,
  block
} = Animated;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class DragCallback extends React.Component {
  constructor(props) {
    super(props);
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.offsetX = new Value(deviceWidth / 2);
    this.offsetY = new Value(100);
    this.gestureState = new Value(-1);
    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.dragX,
          translationY: this.dragY,
          state: this.gestureState,
        },
      },
    ]);
    const addY = add(this.offsetY, this.dragY);
    const addX = add(this.offsetX, this.dragX);
    this.transX = cond(
      eq(this.gestureState, State.ACTIVE),
      addX,
      set(this.offsetX, addX)
    );
    this.transY = cond(
      eq(this.gestureState, State.ACTIVE),
      addY,
      set(this.offsetY, addY)
    );

    this.transY = cond(eq(this.gestureState, State.ACTIVE), addY, [
      cond(eq(this.gestureState, State.END), call([addX, addY], this.onDrop)),
      set(this.offsetY, addY)
    ]);
  }

  onDrop = ([x, y]) => {
    // Logic will go here
    if (
      x >= this.left &&
      x <= this.right &&
      (y >= this.top && y <= this.bottom)
    ) {
      Alert.alert('MASUK', 'WKWKWKWKW')
    }
  };

  saveDropZone = e => {
    const { width, height, x, y } = e.nativeEvent.layout;
    this.top = y;
    this.bottom = y + width;
    this.left = x;
    this.right = x + height;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropZone} onLayout={this.saveDropZone} />
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [
                  {
                    translateX: this.transX,
                  },
                  {
                    translateY: this.transY,
                  },
                ],
              },
            ]}
          />
        </PanGestureHandler>
      </View>
    );
  }
}

const CIRCLE_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  dropZone: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.2)",
    height: "50%",
  },
  box: {
    backgroundColor: "tomato",
    position: "absolute",
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderTopStartRadius: CIRCLE_SIZE / 2,
    borderTopEndRadius: CIRCLE_SIZE / 3,
    borderBottomEndRadius: CIRCLE_SIZE / 2,
    borderColor: "#000",
    borderWidth: 1,
  },
});
