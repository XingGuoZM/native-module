import {createElement,useEffect,useRef}from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';

import{throttle,getScrollViewEl,getFixTop,handleScroll,navScrollTo} from '../util/index';

import './index.css'

window.TAB_FIX_TOP = null;
window.addEventListener('TAB_LIST_TOP',(e)=>{
  window.TAB_FIX_TOP=e.detail&&e.detail.top;
})

export default function TabNav(props){
  const {
    tabList,
    onSelect,
    selectedIndex=0,
    tabFix,
    changeFixStatus,
    tabNavItem,
    fixStatusChangeCb,
    tabNavFixHeight
  }=props;

  const {
    tabNavStyle={},
    tabNavFixStyle={},
    tabNavItemStyle={},
    tabNavItemActiveStyle={}
  }=props;
  const tabElRef=useRef(null);
  const fixTagRef=useRef(null);
  useEffect(()=>{
    const scrollEl=getScrollViewEl();
    const scrollCb=throttle(
      ()=>handleScroll(fixTagRef,(isFix)=>{
        if(isFix!==tabFix){
          changeFixStatus(isFix);
          fixStatusChangeCb && fixStatusChangeCb(isFix);
        }
      }),40,60
    );
    scrollEl.addEventListener('scroll',scrollCb);
    return ()=>{
      scrollEl.removeEventListener('scroll',scrollCb);
    }
  },[tabFix]);

  useEffect(()=>{
    navScrollTo(selectedIndex,tabElRef&&tabElRef.current);
  },[selectedIndex]);

  const navStyle=tabFix?{
    ...tabNavStyle,
    ...tabNavFixStyle,
    top:`${getFixTop()}px`
  }:{
    ...tabNavStyle,
    top:'0px'
  };

  const tabNavCls=tabFix?'tabcom_tabNavStyle tabcom_tabNavFixStyle':'tabcom_tabnavStyle';

  const navEl=tabElRef.current && tabElRef.current._nativeNode;
  const navOffset=navEl && navEl.getBoundingClientRect() || {};
  let fixNavHeight=0;
  if(tabFix){
    fixNavHeight=tabNavFixHeight || (`${navOffset.height}px`);
  }

  return (
    <View>
      <View ref={fixTagRef} className="tabcom_fixNavTag" style={{height:fixNavHeight}} />
      <ScrollView id="J_tab-nav" className={tabNavCls} style={navStyle} horizontal ref={tabElRef}>
        {
          tabList.map((tabItem,index)=>{
            let clsName='tabcom_tabNavItemStyle';
            let wrapStyle = {...tabNavItemStyle};
            let isActive=false;
            if(index===selectedIndex){
              wrapStyle={
                ...tabNavItemStyle,
                ...tabNavItemActiveStyle,
              };
              clsName+=' tabcom_tabNavItemActiveStyle';
              isActive=true;
            }
            if(tabNavItem){
              return (<View onClick={()=>onSelect(index)}
              className="com-tab-item">
                {
                  tabNavItem({
                    isActive,
                    index,
                    isFixed:tabFix,
                    ...tabItem,
                  })
                }
              </View>);
            }
            return (
              <DefaultTabNavItem
              {...{
                clsName,
                wrapStyle,
                index,
                onSelect,
                tabItem,
              }} 
              key={index} />
            );
          })
        }
      </ScrollView>
    </View>);
}


function DefaultTabNavItem(props){
  const{
    clsName,
    wrapStyle,
    index,
    onSelect,
    tabItem
  }=props;
  return <View
  className={`com-tab-item ${clsName}`}
  style={wrapStyle}
  onClick={()=>onSelect(index)}
  key={index}>
  {tabItem.name}
  </View>
}