<template>
	<div class="activities">
		<div class="top_nav" v-if="type == 1">
			<ul>
				<li v-for="(item,index) in topnav" @click="changeid(index + 1)"><p :class="{ischoose:index+1 == id}">{{item}}</p><span v-show="index+1 == id"></span></li>
			</ul>
		</div>
		<div class="top_nav" v-if="type == 2">
			<ul>
				<li v-for="(item,index) in topnav1" @click="changeid(index + 1)" class="top_nav1_li"><p :class="{ischoose:index+1 == id}">{{item}}</p><span v-show="index+1 == id"></span></li>
			</ul>
		</div>
		<div class="content" ref="scroll">
			<div class="noitem" v-if="list == ''"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/kong.png"><p>你还没参与相关活动</p></div>
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
				<li v-for="(item,index) in list" @click="godetail(item.id)">
					<div class="top" :class="{isdonecolor:item.activityStatus == 4}">
						<div class="left"><p>{{item.title}}</p><p>活动时间: {{item.time}}</p></div>
						<div class="right isdoing" v-if="item.activityStatus == 3">进行中</div>
						<div class="right waitdo" v-if="item.activityStatus == 1">待完成</div>
					</div>
					<div class="center">
						<div class="left"><span  :style="{background: 'url('+item.picUrl+')'}"></span><p>发布人: {{item.communityName}}</p></div>
						<div class="right"><p>活动简述:</p>
						<p>{{item.brief}}</p>
						</div>
					</div>
					<div class="bottom">
						<p :class="{isdonecolor:item.activityStatus == 4}">参与本次活动 共积分:</p><span :class="{isdonecolor:item.activityStatus == 4}">{{item.integral}}分</span>
					</div>
					<div class="is_done" v-if="item.activityStatus == 4"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/hdwc1.png"></div>
				</li>
			</ul>
			</scroll>
		</div>
	</div>
</template>
<script>
import scroll from "../basetool/scroll.vue"
import {getOurActivity} from "../api/sendrequest.js"
export default{
	data(){
		return {
			id:1,
			topnav:['我报名的','未完成'],
			topnav1:['已考勤'],
			list:[],
			pullup:true,
			page:1,
			type:0
		}
	},
	mounted(){
		// console.log(this.$route.query.id);
		this.id = this.$route.query.id?this.$route.query.id:1;
		this.type = this.$route.query.type
	},
	created(){
		this.getlist();
	},
	methods:{
		changeid(id){
			if(id == this.id){return}else{
			this.id = id;
			this.changelist(id-1);
		}
		},
		loadUpData(){
			if(this.pullup){
				this.pullup = false;
				this.getlist();
			}else{
				return;
			}
		},
		getlist(){
			let sentdata = '';
			if(this.type == 1){
			if(this.$route.query.id != 1 && this.$route.query.id){
				sentdata = {page:1,size:10,state:this.$route.query.id - 1,activityType:this.$route.query.type}
			}else{
				sentdata = {page:1,size:10,activityType:this.$route.query.type}
			}
		}else{
			sentdata = {page:1,size:10,state:3,activityType:this.$route.query.type}
		}
			// console.log(sentdata);
			getOurActivity(sentdata).then(data => {
				// console.log(data);
				if(this.page == data.data.totalPage){
					this.pullup = false;
				}else{
					this.pullup = true;
					this.page = this.page+1;
				}
				this.list = this.list.concat(data.data.list);
			})
		},
		changelist(id){
			let sentdata = '';
			this.page = 1;
			if(this.id == 1){
				sentdata = {page:this.page,size:10,activityType:this.$route.query.type}
			}else{
				sentdata = {page:this.page,size:10,state:this.id-1,activityType:this.$route.query.type}
			}
			// console.log(sentdata);
			getOurActivity(sentdata).then(data => {
				// console.log(data);
				this.list = data.data.list;
			})
		}
	},
	components:{
		scroll
	}
}	
</script>
<style lang="less" scoped>
.activities{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #F5F5F5;
	.top_nav{
		width: 100%;
		height: 80px;
		background-color: white;
		ul{
			width: 100%;
			display: flex;
			li{
				flex:1;
				p{
					font-size: 30px;
					color: #999999;
					line-height: 75px;
					text-align: center;
				}
				span{
					display: block;
					margin: 0 auto;
					background-color: #f64e45;
					width: 70px;
					height: 4px;
				}
				.ischoose{
					color: black;
				}
			}
			.top_nav1_li{
				width:100%;
			}
		}
	}
	.content{
		width: 100%;
		height: calc(100% - 80px);
		overflow-y: auto;
		.noitem{
			width: 400px;
			position: absolute;
			top:50%;
			left: 50%;
			transform: translate(-50%, -50%);
			img{
				display: block;
				margin: 0 auto;
				height: 276px;
			}
			p{
				font-size: 36px;
				text-align: center;
				color: #A1A1A1;
				padding-top: 20px;
			}
		}
		ul{
			width: 100%;
			li{
				width: 100%;
				height: 384px;
				margin-top: 20px;
				background-color: white;
				position: relative;
				overflow: hidden;
				.top{
					width: 100%;
					height: 119px;
					display: flex;
					.left{
						flex:1;
						padding-left: 31px;
						p:nth-child(1){
							font-size: 30px;
							line-height: 70px;
						}
						p:nth-child(2){
							font-size: 24px;
							color: #999999;
						}
					}
					.right{
						padding-right: 66px;
						line-height: 119px;
						font-size: 30px;
					}
					.isdoing{
						color: #46AFEB;
					}
					.waitdo{
						color: #EBCA46;
					}
				}
				.center{
					width: 100%;
					height: 189px;
					background-color: #EEEEEE;
					display: flex;
					.left{
						width: 159px;
						height: 100%;
						padding-left: 41px;
						overflow: hidden;
						span{
							margin-top: 21px;
							display: block;
							width: 100%;
							height: 119px;
							background-color: white;
							background-size: cover !important;
							background-position: center center !important;
							background-repeat: no-repeat !important;
						}
						p{
							font-size: 20px;
							color: #999999;
							line-height: 49px;
							text-align: center;
						}
					}
					.right{
						padding-left: 27px;
						padding-right: 90px;
						flex:1;
						overflow: hidden;
						p:nth-child(1){
							margin-top: 35px;
						}
						p{
							font-size: 24px;
							color: #999999;
						}

					}
				}
				.bottom{
					width: 100%;
					height: 76px;
					display: flex;
					p{
						flex:1;
						font-size: 24px;
						color: #333333;
						line-height: 76px;
						text-align: right;
					}
					span{
						line-height: 76px;
						font-size: 30px;
						color: #333333;
						padding-right: 58px;
						padding-left: 24px;
					}
				}
				.is_done{
					position:absolute;
					top: -40px;
					right: 65px;
					opacity: .6;
					img{
						height: 212px;
					}
				}
			}
		}
	}
	.isdonecolor{
		color: #999999 !important;
	}
}

</style>