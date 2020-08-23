import { createElement,useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Tab from '../../components/TabList';
import './index.css';
import mockData from './mock';

export default function Home() {
  const [feedsData,setfeedsData]=useState(mockData.data);
  const tabNav={
    tabNavItemActiveStyle:{},
    tabNavFixStyle:{height:100},
    tabNavFixHeight:100,
  }
  const tabPanel={
    panelItem:(data,index)=>{
    return <View key={index} data='spmc'>{data.name}</View>
    },
    isLoadMore:true,
    doLoadMore:(data)=>{
      console.log('load more:',data);
      setfeedsData(feedsData);
    },
    panelWrapStyle:{

    },
    endItem:(props)=>{console.log('endItem',props)}
  }
  const tabProps={
    data:feedsData,
    tabNav,
    tabPanel,
  }
  return (
    <View style={{width:'100vw',height:'100vh'}}>
      <Tab {...tabProps}/>
    </View>
  );
}
