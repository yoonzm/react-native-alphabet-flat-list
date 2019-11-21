/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-9-3
 * Time: 下午6:43
 * Desc:
 */
import * as React from 'react'
import { Component } from 'react';
import {
  Dimensions,
  FlatList,
  InteractionManager,
  LayoutChangeEvent,
  ListRenderItemInfo,
  View,
  ViewToken
} from "react-native";
import SectionHeader, {IProps as SectionHeaderIProps, sectionHeaderHeight} from './SectionHeader';
import styles from "./styles";
import AlphabetListView from "./AlphabetListView";

export interface IItemProps<I> {
  item: I;
  index: number;
  last: boolean;
}

export type ListRenderItem<ItemT> = (props: IItemProps<ItemT>) => React.ReactElement | null;
export type ListRenderSectionHeader<T> = (props: T) => React.ReactElement | null;

export interface IProps<ItemT> {
  data: {
    [key: string]: ItemT[]
  };
  itemHeight: number;
  renderItem: ListRenderItem<ItemT>;
  headerHeight?: number;
  sectionHeaderHeight?: number;
  renderSectionHeader?: ListRenderSectionHeader<SectionHeaderIProps>;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  alphabetToast?: boolean;
}

const defaultProps = {
  headerHeight: 0,
  sectionHeaderHeight: sectionHeaderHeight,
  renderSectionHeader: SectionHeader,
  alphabetToast: true
};

export interface IState {
  containerHeight: number;
  itemLayout: {
    title: string;
    itemLength: number;
    beforeItemLength: number;
    length: number;
    offset: number;
  }[];
  titles: string[];
  selectAlphabet: string;
  initialNumToRender: number;
  pageY: number; // 相对于屏幕的Y坐标
}

const windowHeight = Dimensions.get('window').height;

export default class AlphabetFlatList<ItemT> extends Component<IProps<ItemT>, IState> {
  static defaultProps = defaultProps;

  /**
   * 用于解决点击字母后又触发 onViewableItemsChanged 导致选中的字母与点击的字母不一致问题
   * @type {boolean}
   */
  touchedTime: number = 0;
  container?: View;
  list?: FlatList<ItemT>;
  alphabetList?: AlphabetListView;

  constructor(props: IProps<ItemT>, context: any) {
    super(props, context);
    this.state = {
      containerHeight: windowHeight,
      itemLayout: [],
      titles: [],
      selectAlphabet: '',
      initialNumToRender: 0,
      pageY: 0
    }
  }

  componentDidMount() {
    this.refreshBaseData(this.props.data);
  }

  componentWillReceiveProps(nextProps: IProps<ItemT>) {
    if (nextProps.data !== this.props.data) {
      this.refreshBaseData(nextProps.data);
    }
  }

  /**
   * 计算所需要的数据
   * @param data
   */
  refreshBaseData = (data: any) => {
    const titles = Object.keys(data);

    const offset = (index: number, itemLength: number) => index * this.props.sectionHeaderHeight! + itemLength * this.props.itemHeight;

    const itemLayout = titles.map((title, index) => {
      const beforeItemLength = titles
        .slice(0, index)
        .reduce((length, item) => length + data[item].length, 0);
      const itemLength = data[title].length;
      return {
        title,
        itemLength,
        beforeItemLength,
        length:
          this.props.sectionHeaderHeight! + this.props.itemHeight * itemLength,
        offset: offset(index, beforeItemLength) + this.props.headerHeight!
      };
    });

    // 计算首屏渲染的数量 避免出现空白区域
    let initialNumToRender = itemLayout.findIndex(
      item => item.offset >= this.state.containerHeight
    );
    if (initialNumToRender < 0) {
      initialNumToRender = titles.length;
    }

    this.setState({
      itemLayout,
      titles,
      selectAlphabet: titles[0],
      initialNumToRender
    });
  };

  /**
   * 获取列表区域高度，用于计算字母列表的显示
   */
  onLayout = (e: LayoutChangeEvent) => {
    try {
      // 保证导航动画完成之后在进行获取位置坐标 否则会不准确
      InteractionManager.runAfterInteractions(() => {
        if (this.container) {
          this.container.measure((x, y, w, h, px, py) => {
            this.setState({
              pageY: py
            });
          });
        }
      });
      this.setState({
        containerHeight: e.nativeEvent.layout.height - this.props.headerHeight!
      });
    } catch (error) {
      console.error('捕获错误', error);
    }
  };

  /**
   * 点击字母触发滚动
   */
  onSelect = (index: number) => {
    if (this.list) {
      this.list.scrollToIndex({index, animated: true});
    }
    this.touchedTime = new Date().getTime();
  };

  /**
   * 可视范围内元素变化时改变所选字母
   * @param info
   */
  onViewableItemsChanged = (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
    if (info.viewableItems.length) {
      // 点击字母触发的滚动3秒内不响应
      if ((new Date().getTime() - this.touchedTime) < 500) {
        return;
      }
      if (this.alphabetList) {
        this.alphabetList.updateSelectAlphabet(info.viewableItems[0].item);
      }
    }
  };

  getItemLayout = (data: any, index: number) => ({
    length: this.state.itemLayout[index].length,
    offset: this.state.itemLayout[index].offset,
    index
  });

  renderItem = (info: ListRenderItemInfo<string>) => {
    return (
      <View key={info.index}>
        {this.props.renderSectionHeader && this.props.renderSectionHeader({title: info.item})}
        {this.props.data[info.item].map((itemValue, itemIndex, items) => this.props.renderItem({
          item: itemValue,
          index: itemIndex,
          last: itemIndex === items.length - 1
        }))}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}
            ref={(ref) => {
              this.container = ref as View;
            }}
            onLayout={this.onLayout}
      >
        <FlatList<any>
          ref={(ref) => {
            this.list = ref as FlatList<ItemT>;
          }}
          {...this.props}
          data={this.state.titles}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
          getItemLayout={this.getItemLayout}
          initialNumToRender={this.state.initialNumToRender}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
        <AlphabetListView
          ref={(ref) => {
            this.alphabetList = ref as AlphabetListView;
          }}
          topPosition={this.props.headerHeight!}
          pageY={this.state.pageY + this.props.headerHeight!}
          contentHeight={this.state.containerHeight - this.props.headerHeight!}
          titles={this.state.titles}
          onSelect={this.onSelect}
          alphabetToast={this.props.alphabetToast}
        />
      </View>
    )
  }
}
