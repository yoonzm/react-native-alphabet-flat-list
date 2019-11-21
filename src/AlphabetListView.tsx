/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-9-3
 * Time: 下午9:32
 * Desc: 字母列表
 */

import * as React from 'react'
import { PureComponent } from 'react';
import {GestureResponderEvent, PanResponder, PanResponderGestureState, PanResponderInstance, View, InteractionManager} from 'react-native';
import SectionListItem from './SectionListItem';
import Toast from "./Toast";

interface IProps {
  contentHeight: number;
  topPosition: number;
  pageY: number;
  titles: string[];
  onSelect: (index: number) => void;
  alphabetToast: boolean;
}

const initState = {
  selectAlphabet: '',
  itemHeight: 0
};

type State = Readonly<typeof initState>;

class AlphabetListView extends PureComponent<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = initState;
  }

  componentDidMount() {
    this.initData(this.props);
  }

  componentWillReceiveProps(props: IProps) {
    this.initData(props);
  }

  public updateSelectAlphabet(selectAlphabet: string) {
    this.setState({
      selectAlphabet: selectAlphabet,
    })
  }

  initData({titles, contentHeight}: IProps) {
    this.setState({
      selectAlphabet: titles[0],
      itemHeight: contentHeight / titles.length
    })
  }

  onTouchChange = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const itemHeight = this.props.contentHeight / this.props.titles.length;

    const event: any = e.nativeEvent || {};
    const index = Math.floor((event.pageY - this.props.pageY) / itemHeight);

    if (index >= 0 && index <= (this.props.titles.length - 1)) {
      this.props.onSelect && this.props.onSelect(index);
      this.updateSelectAlphabet(this.props.titles[index]);
      if (this.props.alphabetToast) {
        InteractionManager.runAfterInteractions(() => {
          Toast.show(this.props.titles[index]);
        });
      }
    }
  };

  responder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => true,
    onPanResponderGrant: (this.onTouchChange),
    onPanResponderMove: (this.onTouchChange),
  });

  render() {
    const {selectAlphabet, itemHeight} = this.state;
    // 解决键盘谈起后压缩到一起的问题
    if (itemHeight < 13) {
      return null;
    }

    const {topPosition, contentHeight, titles} = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          top: topPosition,
          right: 5,
          zIndex: 10,
          height: contentHeight
        }}
        {...this.responder.panHandlers}
      >
        {titles.map((title: string) => (
          <SectionListItem
            key={title}
            height={itemHeight}
            title={title}
            active={selectAlphabet === title}
          />
        ))}
      </View>
    );
  }
}

export default AlphabetListView;
