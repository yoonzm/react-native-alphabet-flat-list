/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-9-3
 * Time: 下午6:48
 * Desc:
 */

import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeaderContainer: {
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    paddingLeft: 15
  },
  sectionHeaderTitle: {
    color: '#888',
    fontSize: 14
  },
  sectionListItemContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionListItemWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionListItemText: {
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'PingFangSC-Regular'
  }
})
