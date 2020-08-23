export function bool(str,defaultValue){
  if(str===undefined) return defualtValue || false;
  if(str.toString()==='false') return false;
  if(str.toString==='0') return false;
  return true;
}
// 截流
export function throttle(fn,delay,mustRunDelay){
  let timer=null;
  let start;
  return function(...args){
    const context=this;
    const curr=+new Date();
    clearTimeout(timer);
    if(!start) start=curr;
    if(curr-start>=mustRunDelay){
      fn.apply(context,args);
      start=curr;
    }else{
      timer=setTimeout(()=>{
        fn.apply(context,args);
      },delay);
    }
  }
}

// 获取滚动元素

export function getScrollViewEl(){
  const recyclerView=document.getElementById('recyclerview');
  const isOldCoreRender=recyclerView &&
                        recyclerView.parentElement &&
                        recyclerView.parentElement.style &&
                        recyclerView.parentElement.style.position==='absolute';
  const scrollEl=isOldCoreRender?recyclerView:window;
  return scrollEl;
}

// 获取titlebar高度
export function getFixTop(){
  const fixTop = window.TAB_FIX_TOP;
  if(fixTop){
    return fixTop;
  }

  const el=document.querySelector('.head-container');

  if(!el){
    return 0;
  }
  const offset = el.getBoundingClientRect();
  return offset.top + offset.height;
}

//tab切换时滚动到初始位置
export function scrollToTabInit(containerRef){
  const panelOffset = containerRef.current && containerRef.current.getBoundingClientRect();
  const scrollEl=getScrollViewEl();
  const scrollTop = scrollEl.scrollY || scrollEl.scrollTop;
  const panelTop = parseInt(panelOffset.top);
  const fixTop = getFixTop();
  if(panelTop<0){
    scrollEl.scrollTo(0,scrollTop+panelTop-fixTop);
  }
}

// 处理页面滚动
export function handleScroll(fixTagRef,cb){
  const navOffset = fixTagRef.current && fixTagRef.current.getBoundingClientRect() || {}
  const navTop=navOffset.top;
  const titleBarHeight = getFixTop();
  if(navTop<=titleBarHeight){
    cb&&cb(true);
  }else{
    cb&&cb(false);
  }
}
// 滚动到合适位置
export function navScrollTo(index,navEl){

  if(!navEl) return null;
  const tabItemList=navEl._nativeNode.querySelectorAll('.com-tab-item');
  const offset=tabItemList[index]&&tabItemList[index].getBoundingClientRect()||{}
  const winWidth = window.screen.width;
  const tabItemLeft=offset.left;
  const {scrollLeft} = navEl._nativeNode;
  if(tabItemLeft > winWidth/2 || tabItemLeft<=0){
    const newLeft = tabItemLeft+scrollLeft-winWidth/2;
    navEl._nativeNode.scrollTo(newLeft,0);
  }
}