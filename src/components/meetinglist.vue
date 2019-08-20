<template>
	<div class="meetinglist">
		<div class="search">
			<div><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/search.png"><input type="text" placeholder="搜索会议" @input="watchSearch" v-model="searchtext"></div>
		</div>
		<div class="search_type">
			<div @click="changetype(1)" :class="{ischoose:searchType == 1}">选择社区 <img :src="searchType == 1?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowtop.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowdown.png'">
			</div>
			<div @click="changetype(2)" :class="{ischoose:searchType == 2}">类型 <img :src="searchType == 2?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowtop.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowdown.png'"></div>
			<div @click="changetype(3)" :class="{ischoose:searchType == 3}">{{typetree[typetreenum]}} <img :src="searchType == 3?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowtop.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowdown.png'"></div>
			
		</div>
		<div class="scroll" ref="scroll">
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
					<!-- <li v-for="item in list">{{item}}</li> -->
					<li v-for="item in list" @click="godetail(item.id)" :class="{isdone_back:item.activityStatusText == '已完成'}">
						<div class="w_title"><p :class="{isdone_p1:item.activityStatusText == '已完成'}">{{item.title}}</p><img :src="item.activityStatusText == '已完成'?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/scoregrey.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/score.png'"><p>{{item.integral}}</p></div>
						<div class="w_target">
							<div><span></span><p>{{item.communityName}}</p></div>
							<div v-if="item.tags"><span></span><p>{{item.tags}}</p></div>
						</div>
						<div class="w_content">
							<div class="time">服务时间: {{item.startTime}}&nbsp;&nbsp;&nbsp;{{item.endTime}}</div>
							<!-- <div class="jianshu"><span>活动简述：</span><p>{{item.brief}}</p></div> -->
							<!-- <div class="people">发布人：{{item.communityName}}</div> -->
						</div>
						<div class="w_bottom">
							<p>已请假人数:{{item.signUpCount}}</p>
							<div class="imgbox">
								<img v-for="(data,index1) in item.signUpRecordEntityList" :src="data.userAvatar" v-if="index1 < 5">
								<img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/getmore.png" v-show="item.signUpRecordEntityList && item.signUpRecordEntityList.length > 5">
							</div>
						</div>
						<div class="is_done" v-show="item.activityStatusText == '已完成'"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/hdwc1.png"></div>
						<div class="is_doing" v-show="item.activityStatusText == '进行中'">进行中...</div>
					</li>
				</ul>
			</scroll>
		</div>
		<div class="maskbox" v-show="maskshow" @click="maskclick"></div>
		<div class="search_type_main" v-show="maskshow">
			<div class="type_one" v-show="searchType == 1">
				<div class="top">
					<ul><li class="colorback">全镇</li></ul>
					<ul><li class="colorback" @click="changecommnity('')">全镇 <img :src="communityId == ''?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gouquan.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/quan.png'"></li>
						<li v-for="(item,index) in communitylist" class="colorback" @click="changecommnity(item.communityId)">{{item.commName}}<img :src="communityId == item.communityId?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gouquan.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/quan.png'"></li>
					</ul>
				</div>
				<div class="bottom">
					<div @click="resettypeone">重置</div>
					<div @click="submittypeone">确定</div>
				</div>
			</div>
			<div class="type_two" v-show="searchType == 2">
				<div  @click="changetypetwo(index+1)" v-for="(item,index) in typetwo"><span :class="{ischoose:typetwonum == index+1}">{{item}}</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gou.png" v-show="typetwonum == index+1"></div>
			</div>
			<div class="type_three" v-show="searchType == 3">
				<div v-for="(item,index) in typetree"><span :class="{ischoose:typetreenum == index}" @click="changetypethree(index)">{{item}}</span></div>
			</div>
		</div>
		<b-nav :options="1"></b-nav>
	</div>
</template>
<script>
import nav from './bottomNav.vue'
import scroll from "../basetool/scroll.vue"
import {getCommunity,getActivityList} from "../api/sendrequest.js"

export default{
	data(){
		return {
			list:[1],
			pullup: true,
			maskshow: false,
			searchType:0,
			typeone:0,
			typeone_two:0,
			typetwo:['支部会议','主题党日','教育培训','社区党员大会'],
			typetwonum:'',
			typetreenum:3,
			typetree:['报名中','已截止','已完成','全部'],
			communityId:'',
			communitylist:[],
			searchtext:'',
			page:1
		}
	},
	methods : {
		loadUpData(){
			if(this.pullup){
				// console.log(22);
				this.pullup = false;
				this.page = this.page +1;
				if(this.searchtext){
				this.getmoredata(this.page,2);
			}else{
				this.getmoredata(this.page,1);
			}
			}
			// this.list= [1,2,3,4,5,6,7,8,9,10,11,12]
		},
		changetypetwo(data){
			if(this.typetwonum == data){
				return;
			}else{
				this.typetwonum = data;
				this.searchType = 0;
				this.maskshow = !this.maskshow;
				this.choosetoget();
			}
		},
		changetypethree(data){
			if(this.typetreenum == data){
				return;
			}else{
				this.typetreenum = data;
				this.searchType = 0;
				this.maskshow = !this.maskshow;
				this.choosetoget();
			}
		},
		submittypeone(){
				this.searchType = 0;
				this.maskshow = !this.maskshow;
				this.choosetoget();
		},
		resettypeone(){
			this.communityId = '';
		},
		choosetoget(){
			let pushdata ={};
			pushdata.activityType = 2;
			this.page = 1;
			pushdata.page = 1;
			if(this.communityId != ''){
				pushdata.communityId = this.communityId;				
			}
			if(this.typetwonum != ''){
				pushdata.orgLifeType = this.typetwonum;
			}
			if(this.typetreenum != 3){
				pushdata.state = this.typetreenum + 1;
			}
			// console.log(pushdata);
			getActivityList(pushdata).then(data => {
				this.list = data.data.list;
				this.pullup = data.data.totalPage == this.page?false:true
			})
		},
		changetype(data){
			if(this.searchType == data){
				this.searchType = 0;
				this.maskshow = !this.maskshow;
			}else{
				this.searchType = data;
				this.maskshow = true;
			}
		},
		maskclick(data){
			this.maskshow = !this.maskshow;
			this.searchType = 0;
		},
		godetail(id){
			this.$router.push({'path':'/meeting?id='+id})
		},
		getcommunity(){
			getCommunity({size:1000}).then(data =>{
				// console.log(data);
				this.communitylist = data.data.list;
			})
		},
		changecommnity(id){
			this.communityId = id;
		},
		getactivity(){
			getActivityList({activityType:2}).then(data => {
				// console.log(data);
				this.list = data.data.list;
				this.pullup = data.data.totalPage == this.page?false:true;
			})
		},
		watchSearch(){
			// console.log(this.searchtext);
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				getActivityList({content:this.searchtext,activityType:2}).then(data => {
					this.list = data.data.list;
					this.pullup = data.data.totalPage == this.page?false:true
					// console.log(this.pullup);
				})
			},500)
	},
	getmoredata(page,type){
		if(type == 1){
		let pushdata ={};
			pushdata.activityType = 2;
			pushdata.page = page;
			if(this.communityId != ''){
				pushdata.communityId = this.communityId;				
			}
			if(this.typetwonum != ''){
				pushdata.orgLifeType = this.typetwonum +1;
			}
			if(this.typetreenum != 3){
				pushdata.state = this.typetreenum + 1;
			}
			console.log(pushdata);
			getActivityList(pushdata).then(data => {
				this.list =  this.list.concat(data.data.list);
				this.pullup = data.data.totalPage == this.page?false:true
			})
		}else{
			getActivityList({content:this.searchtext,activityType:2,page:page}).then(data => {
					this.list = this.list.concat(data.data.list);
					this.pullup = data.data.totalPage == this.page?false:true
				})
		}
	}
	},
	components: {
		'b-nav':nav,
		scroll
	},
	created(){
		this.getcommunity();
		this.getactivity();
	}

}
</script>
<style lang="less" scoped>
.meetinglist{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.search{
		width: 100%;
		height: 100px;
		background-color: white;
		overflow: hidden;
		div{
			width: 690px;
			height: 60px;
			background-color: #F7F7F7;
			margin: 0 auto;
			margin-top: 20px;
			box-shadow:0px 2px 2px 0px rgba(181,181,181,0.1);
			border-radius:30px;
			text-align: center;
			overflow:hidden;
			img{
				height: 34px;
				margin-top: 13px;
				margin-right: 15px;
			}
			input{
				border: 0px;
				outline: none;
				font-size: 30px;
				color:#999999;
				position: relative;
				top: -5px;
				width: 250px;
				text-align: center;
				background-color: #F7F7F7;
			}
		}
	}
	.search_type{
		width: 100%;
		height: 120px;
		display: flex;
		background-color: white;
		div{
			width: 33.33%;
			text-align: center;
			line-height: 120px;
			img{
				height: 11px;
				margin-bottom: 3px;
			}
		}
		.ischoose{
			color: #f64e45;
		}
	}
	.scroll{
		width: 100%;
		height: calc(100% - 320px);
		position: relative;
		background-color: #F5F5F5;
		ul{
			padding: 20px 20px;
			li{
				display: block;
				width: 100%;
				background-color: white;
				box-shadow:0px 2px 2px 0px rgba(181,181,181,0.1);
				border-radius: 10px;
				border-bottom: 20px solid #F5F5F5;
				position:relative;
				overflow: hidden;
				.w_title{
					display: flex;
					padding: 0 42px;
					height: 90px;
					line-height: 90px;
					overflow:hidden;
					p:nth-child(1){
						font-size: 30px;
						color: black;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						color:#333333;
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
						text-align: right;
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
				.isdone_p1{
					color: #666666 !important;
				}
				.is_done_p2{
					color: #999999 !important;
				}
				.w_content{
					padding: 0 42px;
					height: 60px;
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
				.is_done{
					position: absolute;
					top: 30px;
					right: 20px;
					height: 212px;
					img{
						height: 212px;
					}
				}
				.is_doing{
					position:absolute;
					bottom: 65px;
					right: 50px;
					font-size: 34px;
					color: #f64e45;
				}
			}
			.isdone_back{
				background-color: #F7F7F7 !important;
			}
		}
	}
	.maskbox{
		width: 100%;
		height: calc(100% - 320px);
		position: absolute;
		top: 220px;
		background-color: rgba(33, 33, 33, 0.7);
		z-index: 2;
	}
	.search_type_main{
		width: 100%;
		position: absolute;
		top: 220px;
		background-color: white;
		z-index: 3;
		.type_one{
			width: 100%;
			height: 700px;
			.top{
				width: 100%;
				height: 610px;
				display: flex;
				ul:nth-child(1){
					width: 250px;
					height: 100%;
					overflow-y: auto;
					li{
						width: 100%;
						height: 87px;
						line-height: 87px;
						font-size: 30px;
						color: #666666;
						text-align: center;
					}
				}
				ul:nth-child(2){
					margin-left: 2px;
					flex:1;
					height: 100%;
					overflow-y: auto;
					li{
						width: 100%;
						height: 87px;
						line-height: 87px;
						font-size: 30px;
						color: #666666;
						text-align: center;
						img{
							display: block;
							float: right;
							margin-right: 57px;
							width: 32px;
							margin-top: 26px;
						}
					}
				}
				.colorback{
					background-color: #EEEEEE;
				}
			}
			.bottom{
				width: 100%;
				height: 90px;
				display: flex;
				> div{
					width: 50%;
					height: 100%;
					line-height: 90px;
					text-align: center;
					font-size: 30px;
					color:#666666;
				}
				> div:nth-child(2){
					color:white;
					background-color: #f64e45;
				}
			}
		}
		.type_two{
			width: 100%;
			height: 350px;
			background-color: #F7F7F7;
			div{
				display: flex;
				padding-left: 51px;
				font-size: 30px;
				line-height: 87px;
				height: 25%;
				.ischoose{
					color: #f64e45;
				}
				span{
					margin-right: 15px;
				}
				img{
					width: 18px;
					height: 14px;
					margin-top: 36px;
				}
			}
			div:nth-child(2n+1){
				background-color: white;
			}
		}
		.type_three{
			width: 100%;
			height: 140px;
			background-color: #F7F7F7;
			display: flex;
			div{
				width: 25%;
				height: 100%;
				span{
					display: block;
					margin: 0 auto;
					margin-top: 36px;
					width: 116px;
					height: 43px;
					border:2px solid #999999;
					border-radius:8px;
					background-color: white;
					text-align: center;
					line-height: 43px;
					font-size: 24px;
					font-weight: 400;
				}
				.ischoose{
					background-color: #f64e45;
					color: white;
					border-color: #f64e45;
				}
			}
		}
	}
}
</style>