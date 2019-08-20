<template>
	<div class="user">
		<div class="usermain">
		<div class="top">
			<div class="center">
				<span  :style="{background: 'url('+userdata.imgUrl+')'}"></span>
				<p>{{userdata.username}}</p>
				<span>共参与{{userdata.activityCount}}次党员服务,积{{userdata.totalIntegral}}分</span>
			</div>
			<!-- <div class="bottom">
				<div @click="goactivities(4)"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/myicon_1.png"><span>已完成</span></div>
				<div><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/jdf.png"><span>交党费</span></div>
				<div @click="goactivities(2)"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/myicon_2.png"><span>待执行</span></div>
			</div> -->
		</div>
		<div class="bottom">
			<ul>
				<li @click="goscore()"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/myicon_6.png"><span>我的积分</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/icon_global_more.png"></li>
				<li @click="goactivities(1)"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/myicon_3.png"><span>我的任务</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/icon_global_more.png"></li>
				<li @click="goscorerule()"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/myicon_7.png"><span>积分规则</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/icon_global_more.png"></li>
				<li @click="goactivities(5)"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/ea7757b72168447cb63cc0bd41c76a5.png"><span>我要吐槽</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/icon_global_more.png"></li>
				<!-- <li @click="gomypic()"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/myicon_5.png"><span>我的照片</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/icon_global_more.png"></li> -->
			</ul>
		</div>
	</div>
		<b-nav :options="4"></b-nav>
	</div>
</template>
<script>
import nav from './bottomNav.vue'
import {getOurCenter} from "../api/sendrequest.js"
export default{
	data(){
		return{
			userdata:''
		}
	},
	created(){
		this.getuserdata();
	},
	methods : {
		goscore(){
			// console.log(123)
			this.$router.push({path:'/score'})
		},
		goactivities(id){
			if(id == 5){
				this.$router.push({path:'/feedback'});
			}else{
			this.$router.push({path:'/activities?id='+id+'&type=1'});
		}
		},
		getuserdata(){
			getOurCenter().then(data => {
				// console.log(data);
				this.userdata = data.data;
			})
		},
		gomypic(){
			this.$router.push({path:'/mypic'})
		},
		goscorerule(){
			this.$router.push({path:'/scorerule'})
		}
	},
	components: {
    'b-nav':nav,
     scroll,
  }
}	
</script>
<style lang="less" scoped>
.user{
	width: 100%;
	height: 100%;
	overflow-y: auto;
	.usermain{
		width: 100%;
		height: calc(100% - 100px);
	.top{
		width: 100%;
		// height: 460px;
		background-image: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/my_back.png');
		background-repeat: no-repeat;
		background-size: cover;
		.center{
			width: 100%;
			height: 315px;
			overflow: hidden;
			span:nth-child(1){
				display: block;
				width: 128px;
				height: 128px;
				border:5px solid rgba(255, 255, 255, 0.38);
				border-radius: 50%;
				margin: 0 auto;
				margin-top: 38px;
				background-repeat:no-repeat !important;
				background-position: center center !important;
				background-size: cover !important;
			}
			p{
				padding-top: 10px;
				font-size: 24px;
				color: white;
				text-align: center;
			}
			span:nth-child(3){
				display: block;
				width: 310px;
				letter-spacing: 3px;
				padding: 0 10px;
				height: 40px;
				line-height: 40px;
				background-color: rgba(0,0,0,.3);
				border-radius: 10px;
				margin: 0 auto;
				margin-top: 25px;
				color: white;
				font-size: 22px;
				text-align: center;
			}
		}
		.bottom{
			width: 690px;
			margin: 0 auto;
			height: 140px;
			background-color: white;
			box-shadow:0px 2px 4px 0px rgba(181,181,181,0.2);
			border-radius:10px;
			display: flex;
			div{
				width: 33.33%;
				height: 100%;
				overflow:hidden;
				img{
					display: block;
					height: 51px;
					margin: 0 auto;
					margin-top: 25px;
					margin-bottom: 13px;
				}
				span{
					display: block;
					text-align: center;
					font-size: 24px;
					color: #f64e45;
				}
			}
		}
	}
	.bottom{
		width: 100%;
		height: calc(100% - 315px);
		background-color: #EEEEEE;
		ul{
			width: 100%;
			overflow: hidden;
			li{
				padding: 30px 47px;
				height: 36px;
				display: flex;
				background-color: white;
				border-bottom: 1px solid #ddd;
				overflow: hidden;
				img:nth-child(1){
					height: 36px;
				}
				span{
					flex:1;
					line-height: 36px;
					font-size: 30px;
					padding-left: 21px;
				}
				img:nth-child(3){
					height: 24px;
					margin-top: 4px;
				}
			}
		}
	}
}
}

</style>