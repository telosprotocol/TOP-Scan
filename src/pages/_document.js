/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          type="text/javascript"
          src="/js/echarts.min.js"
        />
        <script
          type="text/javascript"
          src="/js/world.js"
        />
        <script src="/js/TweenLite.min.js" />
        <script src="/js/CSSPlugin.min.js" />
        <script src="/js/EasePack.min.js" />
        <script type="x-shader/x-vertex" id="vertexshader">
          {`attribute float scale;
        void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = scale * ( 180.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
        }`}
        </script>
        <script
          type="x-shader/x-fragment"
          id="fragmentshader"
        >{`uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 1.0 );
        }`}</script>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
