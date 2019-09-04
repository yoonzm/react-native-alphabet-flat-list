/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import {StatusBar, Text, View} from 'react-native';
import AlphabetFlatList from "react-native-alphabet-flat-list";
import ContactItem, {CONTACT_ITEM_HEIGHT, IContact} from "./ContactItem";

const items: IContact[] = [...new Array(10)]
  .map((i, index) => ({
    id: index,
    avatar: 'https://avatars0.githubusercontent.com/u/22367929?s=40&v=4',
    name: index.toString()
  }));

const data: { [key: string]: IContact[] } = {
  A: items,
  B: items,
  C: items,
  D: items,
  E: items,
  F: items,
  G: items,
  H: items,
  I: items,
  J: items,
  K: items,
  l: items,
  M: items,
  N: items,
  O: items,
  P: items,
  Q: items,
  R: items,
  S: items,
  T: items,
  U: items,
  V: items,
  W: items,
  X: items,
  Y: items,
  Z: items,
};

const HEADER_HEIGHT = 50;

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content"/>
      <AlphabetFlatList<IContact>
        data={data}
        itemHeight={CONTACT_ITEM_HEIGHT}
        headerHeight={HEADER_HEIGHT}
        renderItem={ContactItem}
        ListHeaderComponent={(
          <View style={{
            height: HEADER_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>ListHeaderComponent</Text>
          </View>
        )}
      />
    </Fragment>
  );
};

export default App;
