'use strict';

import {createElement,useState} from 'rax';

import View from 'rax-view';
import Skeleton from './skeketon';
import LoadMore from './loadmore';
import {bool} from '../util';
import Loading from './loading';


export default (props)=>{
  const {
    list,
    renderTabTag,
    isSelected,
    panelItem,
    loadmoreHeight=600,
    loadMoreCb,
    isLoadMore=true,
    endItem,
    loadingItem=Loading,
    index,
  }=props;
  const hasMore=bool(props.hasMore,true);
  const items=list || [];
  return (
    <View
    className="contaner"
    id={index}
    style={{display:!isSelected ? 'none':'flex',minHeight:'100vh'}}>
      {
        renderTabTag && items.length?
        items.map((panelItemData,index)=>panelItem(panelItemData,index)):null
      }
      {
        hasMore && !items.length?<Skeleton /> : null
      }
      {
        isLoadMore ? 
        <Loading loadmoreHeight={loadmoreHeight} doLoadMore={loadMoreCb}/>:null
      }
      {
        !hasMore && isLoadMore?
        (endItem && endItem({index,list:items})):
        (loadingItem && loadingItem({index,hasMore,list:items}))
      }
    </View>
  )
}