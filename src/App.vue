<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html,body{
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,textarea,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font-family: 'Microsoft Yahei'
}
ul,li{
  list-style: none;
}
#app{
  width: 100%;
  height: 100%;
}
.htmlbase p{
  padding: 0.2rem 0;
}
.htmlbase img{
  display: block;
  margin: 0 auto;
}
.htmlbase1 p{
  /*font-size: .28rem !important;*/
  color: #666666;
}
.htmlbase1 img{
  display: block;
  margin: 0 auto;
  max-width: 90%;
}
</style>
