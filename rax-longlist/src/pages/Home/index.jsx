import {createElement, useEffect, useState, Fragment} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import LongList from '../../components/LongList';
import RecyclerList from '../../components/RecyclerList';
import VirtureList from '../../components/VirtureList';
import Recorder from '../../log/recorder';
import { isWeb } from 'universal-env';
import { setupAppear } from 'appear-polyfill';
import {getList, getNav} from './mock';
import './index.css';

let page = 0;
if (isWeb) {
  setupAppear();
}
export default () => {
  const [list, setList] = useState([]);
  const [nav, setNav] = useState();
  // 记录消息总条数
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getMsgList();
    getNavList();
    const {timing: {responseStart, navigationStart}} = window.performance;
    console.log('白屏时间', responseStart - navigationStart);
  }, []);
  // 获取消息分页数据
  const getMsgList = () => {
    page++;
    let currPage = getList(page);

    if (currPage) {
      list.push(...currPage);
      setList([...list]);
      getSum();
    } else {
      // console.log('到底了');
    }
  };
  // 获取底部导航数据
  const getNavList = () => {
    let navs = getNav();
    setNav(navs);
  };
  // 计算未读消息总条数
  const getSum = () => {
    let allNotRead = 0;
    list.forEach(item => {
      if (item.notRead) allNotRead += parseInt(item.notRead);
    });
    setSum(allNotRead);
  };
  {/* 渲染搜索框 */}
  const renderSearch = () => {
    return (<View className="search-wrapper" >
      <View className="search" >
        <Image className="search-img" source={{uri: '../public/images/search.png'}} />
        <Text className="search-text">搜索</Text>
      </View>
    </View>);
  };
  // 渲染消息列表
  const renderList = () => {
    const listDom = list && list.map(item => {
      const trackParams = item.trackInfo.split(',');
      return <View className="list-item" key={item.id}
        onAppear={() => Recorder('appear', trackParams[0], trackParams[1], trackParams[2], item.id)}
        onClick={() => Recorder('click', trackParams[0], trackParams[1], trackParams[2], item.id)}>
        <View className="avatar">
          <Image className="avatar-img" source={{uri: item.image}} />
          {item.notRead && <Text className="msg-count">{item.notRead}</Text>}
        </View>
        <View className="info">
          <View className="info-msg">
            <Text className="info-msg-label">{item.label}</Text>
            <Text className="info-msg-value">{item.value}</Text>
          </View>
          <View className="info-time">
            <Text className="info-time-label">{item.time}</Text>
          </View>
        </View>
      </View>;
    });
    return <Fragment>
      {/* 搜索框 */}
      {renderSearch()}
      {/* 消息列表 */}
      {listDom}
    </Fragment>;
  };
  const renderCell = () => {

  };
  // 渲染底部导航
  const renderNav = () => {
    return (<View className="nav-wrapper">
      {
        nav && nav.map(item => (
          <View className="nav" key={item.id}>
            <Image className="nav-img" source={{uri: item.image}} />
            {item.id == 1 && sum !== 0 && <Text className="msg-count-sum">{sum}</Text>}
            <Text className="nav-text" style={{color: item.active ? '#56ba6a' : '#000000'}}>{item.name}</Text>
          </View>
        ))
      }
    </View>);
  };
  return <View className="wrapper">
    <View className="message">
      <Text className="message-text">{sum === 0 ? '微信' : `微信(${sum})`}</Text>
      <Image className="more" source={{uri: '../../public/images/more.jpg'}} />
    </View>

    <LongList renderContent={() => renderList()} data={list} loadmore={() => getMsgList(page)} />
    {/* RecyclerList 示例 */}
    {/* <RecyclerList /> */}

    {/* VirtureList 示例 */}
    {/* <VirtureList renderCell={() => renderCell()} data={list} loadmore={() => getMsgList(page)} /> */}
    {/* 底部导航 */}
    {renderNav()}
  </View>;
};