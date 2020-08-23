import {Fragment,createElement} from 'rax';
import Image from 'rax-picture';

export default function Mod(props){
  const SKELETON = '###'
  const SKELETON_AMOUNT=4;
  const defaultStyle={
    width:710,
    height:342,
    marginLeft:20,
    marginTop:20
  }
  const {
    amount=SKELETON_AMOUNT,
    pic=SKELETON_AMOUNT,
    style=defaultStyle
  }=props;
  return (
    <Fragment>
      {
        new Array(amount).fill(true).map((item,index)=>{
          return (<Image style={style} source={{uri:pic}} key={index}></Image>)
        })
      }
    </Fragment>
  )
}