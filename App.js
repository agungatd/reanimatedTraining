/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State, ScrollView } from 'react-native-gesture-handler';

import Progress from './components/Progress';
import Sequence from "./components/Sequence";
import Snappable from "./components/Snappable";
import DragCallback from "./components/DragCallback";
const {
  event,
  Value,
  cond,
  eq
} = Animated;

class App extends React.Component {
  constructor(props) {
    super(props);

    const state = new Value(-1);

    this.onStateChange = event([
      {
        nativeEvent: {
          state,
        },
      },
    ]);
    this._opacity = cond(eq(state, State.BEGAN), 0.2, 1);
  }
  render() {
    return (
      <Fragment>
        {/* <ScrollView>
          <View style={styles.container}>
            <View><Text>Progress</Text></View>
            <Progress />
            <View><Text>Sequence</Text></View>
            <Sequence />
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View style={[styles.box, { opacity: this._opacity }]} />
            </TapGestureHandler>
            <View><Text>Snappable:</Text></View>
            <Snappable />
          </View>
        </ScrollView> */}
        <DragCallback />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: 'tomato',
    width: 200,
    height: 200
  }
});

export default App;
