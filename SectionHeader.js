/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-4-12
 * Time: 下午2:39
 * Desc:
 */
import { Text, View } from 'react-native';
import React from 'react';

SectionHeader.height = 25;
export function SectionHeader({ title }) {
  return (
    <View
      style={{
        height: SectionHeader.height,
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        paddingLeft: 15
      }}
    >
      <Text
        style={{
          color: '#888',
          fontSize: 14
        }}
      >
        {title}
      </Text>
    </View>
  );
}
