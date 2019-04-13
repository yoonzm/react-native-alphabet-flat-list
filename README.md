<p align="center" >
   <a href="https://reactnative.gallery/FaridSafi/gifted-chat">
    <img alt="react-native-alphabet-flat-list" src="https://github.com/yoonzm/react-native-alphabet-flat-list/blob/master/screenshot/image1.gif" width="260" height="510" />
    <img alt="react-native-alphabet-flat-list" src="https://github.com/yoonzm/react-native-alphabet-flat-list/blob/master/screenshot/image2.gif" width="260" height="510" />
 </a>

</p>

<h3 align="center">
   Alphabet FlatList
</h3>

## Example
```jsx
import React, { Component } from 'react';
import { Text, View } from 'react-native';

const CONTACTS = {
  A: ['Any', 'Avatar'],
  B: ['Basketball', 'Big']
};

const ITEM_HEIGHT = 50;

class Example extends Component {
  render() {
    return (
      <SWAlphabetFlatList
        data={CONTACTS}
        renderItem={({ item }) => (
          <View style={{ height: ITEM_HEIGHT }}>
            <Text>{item}</Text>
          </View>
        )}
        itemHeight={ITEM_HEIGHT}
      />
    );
  }
}

```

## Props
- **`data`**_(Object)_ [isRequire] - listData to display
- **`itemHeight`**_(Number)_ [isRequire] - itemComponent height
- **`renderItem`**_(Function)_ [isRequire] - itemComponent render
- **`sectionHeaderHeight`**_(Number)_ - sectionHeader height; default is 25
- **`sectionHeaderComponent`**_(Component)_ - sectionHeader


## License

- [MIT](LICENSE)
