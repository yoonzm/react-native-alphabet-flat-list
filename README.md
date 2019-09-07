<p align="center" >
   <a href="https://github.com/yoonzm/react-native-alphabet-flat-list">
    <img alt="react-native-alphabet-flat-list" src="https://github.com/yoonzm/react-native-alphabet-flat-list/blob/master/screenshot/image1.gif" width="260" height="510" />
    <img alt="react-native-alphabet-flat-list" src="https://github.com/yoonzm/react-native-alphabet-flat-list/blob/master/screenshot/image2.gif" width="260" height="510" />
 </a>
</p>

<h3 align="center">
   Alphabet FlatList
</h3>

## Installation

- Using [npm](https://www.npmjs.com/#getting-started): `npm install @yoonzm/react-native-alphabet-flat-list --save`
- Using [Yarn](https://yarnpkg.com/): `yarn add @yoonzm/react-native-alphabet-flat-list`

## Example
```jsx
import React, {Fragment} from 'react';
import {StatusBar, Text, View} from 'react-native';
import AlphabetFlatList from "react-native-alphabet-flat-list";
import ContactItem, {CONTACT_ITEM_HEIGHT, IContact} from "./ContactItem";

...

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

```
[Detail](./example/App.tsx)

## Props
- **`data`**_(Object)_ [isRequire] - listData to display
- **`itemHeight`**_(Number)_ [isRequire] - itemComponent height
- **`renderItem`**_(Function)_ [isRequire] - itemComponent render
- **`sectionHeaderHeight`**_(Number)_ - sectionHeader height; default is 25
- **`renderSectionHeader`**_(Function)_ - sectionHeader
- **`ListHeaderComponent`**_(Function)_ - ListHeader
- **`alphabetToast`**_(Boolean)_ - click on the letter to prompt

## Download

| 类型          | 二维码                                      |
| ----------- | ---------------------------------------- |
| **Apk二维码**  | ![](https://github.com/yoonzm/react-native-alphabet-flat-list/blob/master/download.png) |
| **IOS暂无下载** |  |

## License

- [MIT](LICENSE)
