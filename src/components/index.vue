<template>
  <div class="index">
    <div class="indexmain">
    <div class="swiper1">
       <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in swiperdata" :key="index"><div class="swiper-contain" @click="gourl(item.link)"><img :src="item.imgUrl"></div></swiper-slide>
      </swiper>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <div class="top_nav">
      <ul>
        <li v-for="(item,index) in topNav" @click="gomodal(index)"><img :src="item.src"><p>{{item.text}}</p></li>
      </ul>
    </div>
    <div class="wishingwall">
        <div class="title"><span></span><p>党员服务</p><span @click="gomodal(0)">更多</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/more.png" @click="gomodal(0)"></div>
        <div class="content" ref="wrapper">
          <ul ref="contentul">
            <li ref="contentli" v-for="(item,index) in wishinglist" @click="godetail(item.id)"><div class="w_title"><p>{{item.title}}</p><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/score.png"><p>{{item.integral}}</p></div>
              <div class="w_target">
              <div><span></span><p>{{item.communityName}}</p></div>
              <div v-if="item.tags"><span></span><p>{{item.tags}}</p></div>
            </div>
            <div class="w_content">
              <div class="time">服务时间: {{item.startTime}}&nbsp;&nbsp;&nbsp;{{item.endTime}}</div>
              <div class="jianshu"><span>活动简述：</span><p>{{item.brief}}</p></div>
              <!-- <div class="people">发布人：{{item.communityName}}</div> -->
            </div>
              <div class="w_bottom">
                <p>所需人数:{{item.minLimit}}</p>
              <div class="imgbox">
                <img v-for="(data,index1) in item.signUpRecordEntityList" :src="data.userAvatar" v-if="index1 < 5">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/getmore.png">
              </div>
              </div>
            </li>
            <li ref="contentli" class="contentli1"></li>
          </ul>
        </div>
    </div>
    <div class="renqi">
        <div class="r_title"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/sqphb.png"><!-- <span>第5期</span> --></div>
        <div class="r_content">
            <div class="r_content_1">
              <div class="imgbox">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rqb_2.png">
                <span :style="{background: 'url('+rank[1].url+')'}"></span>
              </div>
              <p>{{rank[1].text}}</p>
            </div>
            <div class="r_content_1">
              <div class="imgbox">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rqb_1.png">
                <span :style="{background: 'url('+rank[0].url+')'}"></span>
              </div>
              <p>{{rank[0].text}}</p>
            </div>
            <div class="r_content_1">
              <div class="imgbox">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rqb_3.png">
               <span :style="{background: 'url('+rank[2].url+')'}"></span>
              </div>
              <p>{{rank[2].text}}</p>
            </div>
        </div>
        <div class="r_bottom" @click="gomodal(3)">查看完整榜单</div>
    </div>
    <div class="tuijian">
      <div ref="tuijian">
        <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/tuijian.jpg">
        <div class="tuijian-content">
          <ul :style="{transform:'translateY(-'+tuijianheight+'px)'}">
            <li v-for="item in tuijiandata" @click="godetail1(item.id)"><p>{{item.title}}</p><span>{{item.addTime}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="rewen">
          <div class="w_title"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_bt_rwb.png"></div>
          <div class="w_content">
            <ul>
              <li v-for="(item,index) in rewenlist" @click="godetail1(item.id)"><div class="left">
                <p><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rwb_1.png" v-if="index == 0">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rwb_2.png" v-if="index == 1">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rwb_3.png" v-if="index == 2">
                {{item.title}}</p>
                <div class="left_bottom"><!-- <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_icon_huo.png"><span>1234</span> --><span>{{item.addTime}}</span></div>
              </div><div class="right"><img :src="item.coverImg"></div></li>
            </ul>
          </div>
          <!-- <div class="w_bottom" @click="gomodal(2)">进入大沥党建</div> -->
    </div>
  </div>
    <b-nav :options="2"></b-nav>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import BScroll from 'better-scroll'
import nav from './bottomNav.vue'
import { swiper,swiperSlide} from 'vue-awesome-swiper'
import {getActivityList,getCommunityOrder,getNewListall,getbanner} from "../api/sendrequest.js"
export default {
  name: 'index',
  data () {
    return {
       swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay:true
        },
        topNav:[
          {text:'党员服务',src:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/service_top.png'},
          {text:'组织生活',src:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/organize_top.png'},
          {text:'大沥党建',src:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/produce_top.png'},
          {text:'排行榜',src:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/ranking_top.png'}
        ],
        topNavMoreIndex:2,
        wishinglist:[],
        ranklist:[],
        rewenlist:[],
        swiperdata:[],
        tuijianindex:0,
        tuijianheight:0,
        tuijiandata:[]
    }
  },
  mounted(){
    this.$nextTick(() => {
      
        })
  },
  computed: {
      rank(){
        if(this.ranklist != ''){
          return [{text:this.ranklist[0].communityName,url:this.ranklist[0].avatarUrl},
          {text:this.ranklist[1].communityName,url:this.ranklist[1].avatarUrl},
          {text:this.ranklist[2].communityName,url:this.ranklist[2].avatarUrl}]
        }else{
          return [{text:'',url:''},{text:'',url:''},{text:'',url:''}]
        }
      }
  },
  created(){
    this.getwishing();
    this.getranklist();
    this.getrewenlist();
    this.getswiperdata();
    this.gettuijian();
  },
  methods : {
    changeTopNav(){
        if(this.topNavMoreIndex == 2){
          this.topNavMore = {url:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_icon_7.png',text:'收起'}
          this.topNavMoreIndex = 4;
        }else{
          this.topNavMore = {url:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_icon_6.png',text:'更多'}
          this.topNavMoreIndex  = 2;
        }
    },
    getwishing(){
      getActivityList({size:5,isRecommend:1,activityType:1}).then(data => {
        // console.log(data);
        this.wishinglist = data.data.list;
        let width = 0;
          for (let i =0;i<data.data.list.length;i++){
              width+=this.$refs.contentli.offsetWidth + 15; 
          }
          // console.log(width);
           this.$refs.contentul.style.width=width+30+'px'
          this.scroll = new BScroll(this.$refs.wrapper,{scrollX:true,scrollY:false,click:true,eventPassthrough:'vertical'});
      })
    },
    godetail(id){
      // console.log(id);
      this.$router.push({'path':'/wishingdetail?id='+id});
    },
    getranklist(){
      getCommunityOrder({size:3}).then(data => {
        this.ranklist = data.data.list;
      })
    },
    getrewenlist(){
      getNewListall({type:1,isHot:1,size:5}).then(data => {
        this.rewenlist = data.data.list;
      })
    },
    godetail1(id){
      // this.$store.commit('SETSHOWNEWSDETAIL',true);
      this.$store.commit('SETDETAILID',id);
      // console.log(this.$store.state.shownewsdetail);
      this.$router.push({'path':'/newsdetail?type=1&id='+id});
    },
    gomodal(index){
      switch(index){
        case 0:
        this.$router.push({'path':'/wishingwall'});
        break;
        case 1:
        this.$router.push({'path':'/meetinglist'})
        break;
        case 2:
        this.$router.push({'path':'/news'})
        break;
        case 3:
        this.$router.push({'path':'/rank'})
        break;
      }
    },
    getswiperdata(){
      getbanner({positionId:1}).then(data => {
        // console.log(data);
        this.swiperdata = data.data
      })
    },
    gettuijian(){
      getNewListall({type:2,size:10,page:1}).then(data => {
        let dom_height = this.$refs.tuijian.offsetHeight;
        // this.tuijianheight = dom_height;
        // let a = [{text:'123123123123',time:'12-12'},{text:'123123123123',time:'12-1'},{text:'123123123123',time:'12-2'}]
        let a = data.data.list;
        a.forEach((item,index) => {
          let time = item.addTime.split(' ');
          a[index].addTime = time[0];

        })
        this.tuijiandata.push(a[0]);
        this.tuijianindex = 0;
        let index = 1;
        if(a.length > 1){
        this.timer = setInterval(() => {
          if(this.tuijianindex >= a.length -1){
            this.tuijianindex = 0;
          }else{
            this.tuijianindex = this.tuijianindex + 1; 
          }
          this.tuijiandata.push(a[this.tuijianindex]);
          this.tuijianheight = index * dom_height;
          index = index + 1;
          // console.log(this.tuijianheight); 
        },5000)
    }else{
      return;
    }
      })
    },
    gourl(link){
      // console.log(link);
      if(link){
        window.location.href = link;
      }else{
        return;
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    'b-nav':nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index{
  height: 100%;
  overflow: hidden;
}
.indexmain{
  height: calc(100% - 100px);
  background-color: white;
  overflow-y: auto;
}
.swiper1{
  width: 100%;
  height: 380px;
  background-color:#fff;
  overflow: hidden;
  .swiper-contain{
    width: 100%;
    height: 334px;
    position: relative;
    background-color: #b4201c;
    img{
      width: auto;
      height: 100%;
      margin: 0 auto;
      display: block;
    }
    p{
      position: absolute;
      width: 100%;
      text-align: center;
      background-color: rgba(0,0,0,.5);
      font-size: 24px;
      height: 65px;
      line-height: 65px;
      color: white;
      left: 0;
      bottom: 0px;
    }
  }
  .swiper-pagination{
    position: relative;
  }
}
.top_nav{
  padding: 48px 40px;
  padding-top: 20px;
  background-color: white;
  ul{
    width: 100%;
    li{
      list-style: none;
      display: inline-block;
      width: 25%;
      margin-right: -3px;
      text-align: center;
      clear: both;
      img{
        height: 66px;
      }
    }
    li:nth-child(5),li:nth-child(6){
      margin-top: 33px;
    }
  }
}
.wishingwall{
  width: 100%;
  background-color: rgb(247,247,247);
  padding-bottom: 30px;
  overflow: hidden;
  .title{
    display: flex;
    width: 100%;
    height: 84px;
    line-height: 84px;
    span:nth-child(1){
      width: 10px;
      height: 31px;
      background-color: #f64e45;
      margin-left: 49px;
      margin-right: 18px;
      border-radius: 5px;
      margin-top: 29px;
    }
    img{
      height: 23px;
      margin-right: 63px;
      margin-top: 30px;
      margin-left: 20px;
    }
    p{
      flex: 1;
      font-size: 34px;
      font-weight: bold;
    }
  }
  .content{
    width: 100%;
    height: 334px;
    white-space: nowrap;
    ul{
      width: auto;
      li{
        display: inline-block;
        width: 690px;
        height: 334px;
        margin-left: 15px;/*px*/
        background-color: white;
        border-radius: 20px;
        box-shadow:0px 2px 8px 0px rgba(181,181,181,0.48);
        overflow: hidden;
        .w_title{
          display: flex;
          padding: 0 22px;
          height: 90px;
          line-height: 90px;
          p:nth-child(1){
            font-size: 30px;
            color: black;
            font-weight: bold;
            flex:1;
          }
          img{
            height: 33px;
            margin-top: 29px;
          }
          p:nth-child(3){
            padding-left: 20px;
            font-size: 30px;
            color: #333333;
          }
        }
        .w_target{
          padding: 0 42px;
          height: 50px;
          overflow: hidden;
          display: flex;
          div{
            height: 30px;
            display: flex;
            overflow: hidden;
            background-color: #f64e45;
            span{
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background-color: white;
              margin-left: 4px;
              margin-top: 4px;
            }
            p{
              flex:1;
              text-align: center;
              line-height: 30px;
              padding: 0 15px;
              font-size: 20px;
              color:white;
            }
          }
          div:nth-child(2){
            background-color: #46A4C4;
            margin-left: 13px;
          }
        }
        .w_content{
          padding: 0 42px;
          height: 120px;
          font-size: 24px;
          color: #999999;
          line-height: 40px;
          .jianshu{
            padding-top: 22px;
            padding-bottom: 20px;
            display: flex;
            height: 40px;
            width: 600px;
            span{
              width: 120px;
            }
            p{
              flex:1;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
        .w_bottom{
         border-top: 1px solid #EEEEEE;
         width: 100%;
         height: 60px;
         display: flex;
         p{
          flex:1;
          font-size: 24px;
          color:#666666;
          padding-left: 42px;
          line-height: 60px;
        }
        .imgbox{
          width: 300px;
          padding-right: 40px;
          text-align: right;
          img{
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 17px;
            margin-right: 14px;
          }
        }
      }
    }
    .contentli1{
      box-shadow: none !important;
      background-color: rgb(247,247,247) !important;
    }
  }
}
}
.renqi{
  width: 100%;
  background-color: white;
  .r_title{
    width: 100%;
    padding-top: 33px;
    position: relative;
    img{
      display: block;
      height: 33px;
      margin: 0 auto;
    }
    span{
      position:absolute;
      top: 33px;
      right: 32px;
      font-size: 24px;
      color: #666666;
    }
  }
  .r_content{
    width: 100%;
    padding-top: 69px;
    display: flex;
    .r_content_1{
      width: 33.33%;
      .imgbox{
        width: 159px;
        position: relative;
        left: calc(50% - 100px);
        display: flex;
        span{
          display: block;
          width: 80px;
          height: 80px;
          margin-top: 16px;
          overflow: hidden;
          border-radius: 50%;
          background-position: center center !important;
          background-size: cover !important;
          background-repeat: no-repeat !important;
        }
        img{
          margin-left: 16px;
          width: 50px;
          height: 60px;
        }
      }
      p{
        margin: 0 auto;
        padding-top: 19px;
        font-size: 26px;
        color: black; 
        text-align: center;
      }
    }
    .r_content_1:nth-child(1), .r_content_1:nth-child(3){
      .imgbox{
       margin-top: 50px;
     }
   }
 }
 .r_bottom{
  margin: 0 auto;
  margin-top: 53px;
  width: 225px;
  height: 55px;
  color: #f64e45;
  border: 2px solid #f64e45;
  border-radius: 28px;
  line-height: 59px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 23px;
}
}
.tuijian{
  padding: 0 22px;
  height: 66px;
  border-top: 20px solid #f7f7f7;
  border-bottom: 20px solid #f7f7f7;
  background-color: #f7f7f7;
  overflow: hidden;
  > div{
    width: 100%;
    height: 100%;
    border-radius: 33px;
    background-color: white;
    box-shadow:0px 2px 2px 0px rgba(181,181,181,0.1);
    display: flex;
    img{
      height: 24px;
      margin-top: 21px;
      margin-left: 34px;
    }
    .tuijian-content{
      flex:1;
      margin-left: 28px;
      height: 66px;
      overflow: hidden;
      ul{
        width: 100%;
        transition: all .5s;
        li{
          width: 100%;
          height: 66px;
          display: flex;
          line-height: 66px;
          p{
            flex:1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
          span{
            margin-right: 26px;
          }
        }
      }
    }
  }
}
.rewen{
  background-color: white;
  .w_title{
    text-align: center;
    border-top: 20px solid #f7f7f7;
    img{
      display: block;
      height: 33px;
      margin: 0 auto;
    }
  }
  .w_content{
    padding: 50px 30px 0 37px;
    ul{
      width: 100%;
      li{
        width: 100%;
        height: 154px;
        padding: 37px 0 24px 0;
        display: flex;
        border-bottom: 1px solid #EEEEEE;
        .left{
         flex:1;
         p{
          font-size: 28px;
          font-weight: bold;
          height: calc(100% - 50px);
          img{
            width: 67px;
          }
        }
        .left_bottom{
          width: 100%;
          height: 50px;
          line-height: 50px;
          display: flex;
          font-size: 24px;
          color: #999999;
          img{
            width: 19px;
            height: 22px;
            margin-left: 20px;
            margin-top: 15px;
          }
          span{
            flex:1;
            text-align: right;
            padding-right: 19px;
          }
        }
      }
      .right{
       width: 204px;
       height: 100%;
       img{
        height: 100%;
        width: 100%;
      }
    }
  }
}
}
.w_bottom{
  margin: 0 auto;
  margin-top: 29px;
  width: 225px;
  height: 55px;
  color: #f64e45;
  border: 2px solid #f64e45;
  border-radius: 28px;
  line-height: 59px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 23px;
}
}
</style>
