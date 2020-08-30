import en from './en';
import zh from './zh';

export default function(lan, key) {
  console.log(lan);
  switch (lan) {
    case 'en': return en[key];
    case 'zh':return zh[key];
  }
}