import { createElement } from 'rax';
import { Root, Style, Script } from 'rax-document';

function Document() {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />
        <title>rax-longlist</title>
        <Style />
      </head>
      <body style={{margin:'0vw',width:'100vw',height:'100vh'}}>
        <Root />
        <Script />
      </body>
    </html>
  );
}
export default Document;
