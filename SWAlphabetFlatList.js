/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 19-4-12
 * Time: 下午2:15
 * Desc: 自定义带字母的滚动列表
 */
import React, { Component } from 'react';
import { View, FlatList, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import { SectionHeader } from './SectionHeader';
import { AlphabetListView } from './AlphabetListView';

export class SWAlphabetFlatList extends Component {
  static propTypes = {
    /**
     * 需要按字母展示的数据
     * 数据格式为: {
     *   A: [{
     *     id: 1,
     *     name: '1'
     *   }],
     *   B: [{
     *     id: 2,
     *     name: '2'
     *   }, {
     *     id: 3,
     *     name: '3'
     *   }],
     * }
     */
    data: PropTypes.object.isRequired,
    itemHeight: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    sectionHeaderHeight: PropTypes.number,
    sectionHeaderComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ])
  };

  static defaultProps = {
    sectionHeaderHeight: SectionHeader.height,
    sectionHeaderComponent: SectionHeader
  };

  constructor(props) {
    super(props);
    /**
     * 用于解决点击字母后又触发 onViewableItemsChanged 导致选中的字母与点击的字母不一致问题
     * @type {boolean}
     */
    this.touchedTime = 0;
    this.state = {
      containerHeight: 0,
      itemLayout: {},
      titles: [],
      selectAlphabet: null,
      pageY: 0 // 相对于屏幕的Y坐标
    };
  }

  componentDidMount() {
    this.refreshBaseData(this.props.data);
  }

  componentWillReceiveProps({ data }) {
    if (data !== this.props.data) {
      this.refreshBaseData(data);
    }
  }

  /**
   * 计算所需要的数据
   * @param data
   */
  refreshBaseData = (data) => {
    const titles = Object.keys(data);

    const offset = (index, itemLength) => index * this.props.sectionHeaderHeight
      + itemLength * this.props.itemHeight;

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
          this.props.sectionHeaderHeight + this.props.itemHeight * itemLength,
        offset: offset(index, beforeItemLength)
      };
    });

    this.setState({
      itemLayout,
      titles,
      selectAlphabet: titles[0]
    });
  };

  /**
   * 获取列表区域高度，用于计算字母列表的显示
   */
  onLayout = ({ nativeEvent: { layout } }) => {
    this.container.measure((x, y, w, h, px, py) => {
      this.setState({
        pageY: py
      });
    });
    this.setState({
      containerHeight: layout && layout.height
    });
  };

  /**
   * 点击字母触发滚动
   */
  onSelect = (index) => {
    this.list.scrollToIndex({ index });
    this.touchedTime = new Date().getTime();
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        selectAlphabet: this.state.titles[index]
      });
    });
  };

  /**
   * 可视范围内元素变化时改变所选字母
   * @param viewableItems
   */
  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length) {
      // 点击字母触发的滚动3秒内不响应
      if (new Date().getTime() - this.touchedTime < 3000) {
        return;
      }
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          selectAlphabet: viewableItems[0].item
        });
      });
    }
  };

  getItemLayout = (data, index) => ({
    length: this.state.itemLayout[index].length,
    offset: this.state.itemLayout[index].offset,
    index
  });

  renderItem = ({ item }) => {
    const MSectionHeader = this.props.sectionHeaderComponent;

    return (
      <View>
        <MSectionHeader title={item} />
        {this.props.data[item].map(itemValue => this.props.renderItem({ item: itemValue }))}
      </View>
    );
  };

  render() {
    return (
      <View
        ref={(ref) => {
          this.container = ref;
        }}
        onLayout={this.onLayout}
      >
        <FlatList
          ref={(ref) => {
            this.list = ref;
          }}
          {...this.props}
          data={this.state.titles}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          getItemLayout={this.getItemLayout}
          initialNumToRender={2}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
        <AlphabetListView
          pageY={this.state.pageY}
          contentHeight={this.state.containerHeight}
          titles={this.state.titles}
          selectAlphabet={this.state.selectAlphabet}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}
