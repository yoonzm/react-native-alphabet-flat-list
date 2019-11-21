/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-9-3
 * Time: 下午7:59
 * Desc:
 */
import * as React from 'react'
import { FC } from 'react';
import {Text, View} from "react-native";
import styles from "./styles";

export interface IProps {
  title: string;
}

export const sectionHeaderHeight = 25;

const SectionHeader: FC<IProps> = function (props) {
  return (
    <View
      style={[styles.sectionHeaderContainer, {
        height: sectionHeaderHeight,
      }]}
    >
      <Text style={styles.sectionHeaderTitle}>
        {props.title}
      </Text>
    </View>
  )
};

export default SectionHeader;
