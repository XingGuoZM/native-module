import {createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import './index.css';
/**
 * 虚拟列表例子
 */
const scrollRef = createRef();

const bottomRef = createRef();

const firstRef = createRef();
const secondRef = createRef();
const thirdRef = createRef();

let page = 1;

let currDis = 0;
let step = 200;
let prevDis = 3.25;
export default (props) => {
  // console.log(prop)
  let {renderCell, data} = props;
  let [page1, setPage1] = useState(1);
  let [page2, setPage2] = useState(2);
  let [page3, setPage3] = useState(3);
  function handleScroll() {
    scrollRef.current._nativeNode.addEventListener('scroll', (e) => {
      let y = bottomRef.current.getBoundingClientRect().bottom;
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      currDis = y / document.documentElement.clientHeight;
      // 计算比率，检测是否到底了
      let distance = step / 100;
      // 加载更多
      // console.log(currDis, distance);
      if (currDis < distance && currDis < prevDis ) {
        bottomRef.current.style.bottom = `-${step * page}vw`;
        if (page % 3 === 1 && page > 1) {
          secondRef.current.style.top = `${step * page}vw`;
          setPage3(page + 2);
        } else if (page % 3 === 2 && page > 2) {
          thirdRef.current.style.top = `${step * page}vw`;
          setPage1(page + 2);
        } else if (page % 3 === 0) {
          firstRef.current.style.top = `${step * page}vw`;
          setPage2(page + 2);
        }
        page++;
        console.log('向上滑动', page);
      // 回看
      } else if (currDis > 3.4 && currDis > prevDis) {
        page -= 1;
        bottomRef.current.style.bottom = `-${step * page}vw`;
        if (page % 3 === 1 && page > 1) {
          secondRef.current.style.top = `${step * page - 3 * step}vw`;
          setPage3(page - 1);
        } else if (page % 3 === 2 && page > 2) {
          thirdRef.current.style.top = `${step * page - 3 * step}vw`;
          setPage1(page - 1);
        } else if (page % 3 === 0 ) {
          firstRef.current.style.top = `${step * page - 3 * step}vw`;
          setPage2(page - 1);
        }
        console.log('向下滑动', page);
      }
    });
  }
  useEffect(() => {
    handleScroll();
  }, [page]);

  return <ScrollView className="list-wrapper" ref={scrollRef}>
    <View className="page-wrap">
      <View className="first page" ref={firstRef} >{data.length > 0 && data.map(item => renderCell(item))}</View>
      <View className="second page" ref={secondRef} >{data.length > 0 && data.map(item => renderCell(item))}</View>
      <View className="third page" ref={thirdRef} >{data.length > 0 && data.map(item => renderCell(item))}</View>

      {/* <View className="first page" ref={firstRef} >{page1}</View>
      <View className="second page" ref={secondRef} >{page2}</View>
      <View className="third page" ref={thirdRef} >{page3}</View> */}
      <View className="bottom" ref={bottomRef}>到底了～</View>
    </View>
  </ScrollView>;
};