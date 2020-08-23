import View from 'rax-view';
import {createElement} from 'rax';

export default function Mod(props){
  const {loadmoreHeight,doLoadMore}=props;
  const top = loadmoreHeight ||600;
  const relative='relative';

  const loadMorePreloadStyle={position:relative,top:`-${top}rpx`}
  return (<View style={loadMorePreloadStyle} onAppear={()=>{doLoadMore();}} />)
}