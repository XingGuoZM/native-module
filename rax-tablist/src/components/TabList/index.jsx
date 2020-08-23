import {createElement,useRef,useState,useEffect} from 'rax';
import View from 'rax-view';
import TabNav from './tabNav';
import TabPanel from './tabPanel';
import Slider from 'rax-slider';
import {scrollToTabInit} from './util';
import './index.css';
import {setupAppear}from 'appear-polyfill';

setupAppear();

export default function Mod(props){
  const {
    data,
    tabNav,
    tabPanel,
    activeIndex=0,
    fixStatusChangeCb,
    tabChange
  }=props;

  const {
    doLoadMore,
    panelWrapStyle,
    panelWidth
  }=tabPanel;
  if(!data || !data.length) return null;

  const [selectedIndex,setSelectedIndex]=useState(activeIndex);
  const [tabFix,setTabFix]=useState(false);
  const initTags =new Array(data.length).fill(false);
  initTags[selectedIndex]=true;
  const [tagArr,setTagArr]=useState(initTags);
  const containerRef=useRef(null);
  const sliderRef=useRef(null);

  useEffect(()=>{
    window.addEventListener('TAB_CHANGE',(e)=>{
      let newActiveIndex=e.detail && e.detail.index;
      newActiveIndex=parseInt(newActiveIndex)
      if(newActiveIndex>=0 && newActiveIndex<data.length){
        setSelectedIndex(newActiveIndex);
      }
    })
  },[]);
// tab nav 分类点击
  const onTabSelect=(index)=>{
    sliderRef.current.slideTo(index);
  }
  // 左右滑动
  const onSliderChange=(e)=>{
    changeSelectedIndex(e.index);
  }
  // 修改选中tab处理
  const changeSelectedIndex=(index)=>{
    setSelectedIndex(index);
    tagArr[index]=true;
    setTagArr(tagArr);
    scrollToTabInit(containerRef);
    tabChange&&tabChange(index);
  }

  //加载更多
  const loadMore = (index)=>{
    const list=data[index] && data[index].list || [];
    if(!list.length) return ;
    doLoadMore && doLoadMore(index);
  }
  const changeFixStatus = (newStatus) => {
    setTabFix(newStatus);
  }

  const navProps={
    tabList:data,
    onSelect: onTabSelect,
    tabFix,
    changeFixStatus,
    fixStatusChangeCb,
    ...tabNav,
  }
  return (
    <View
    id="J_tab"
    ref={containerRef}>
      <TabNav {...navProps} />
      <Slider className="tabcom_slider"
      showsPagination={false}
      index={selectedIndex}
      style={{
        width:panelWidth || 750,
        ...panelWrapStyle,
      }}
      ref={sliderRef}
      onChange={onSliderChange}>
        {
          data.map((item,index)=>{
            <Slider.Item>
              {item}
            {/* <TabPanel
            index={index}
            key={item.key}
            isSelected={selectedIndex===index}
            list={item.list}
            loadMoreCb={()=>{loadMore(index)}}
            hasMore={item.hasMore}
            renderTabTag={tagArr[index]}
            {...tabPanel} /> */}
            </Slider.Item>

          })
        }
      </Slider>
    </View>
  );
}