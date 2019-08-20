<template>
	<div class="littleWish">
		<div class="topNav">
			<p  @click="toWishingWall">
				<span>党员服务</span>
			</p>
			<p>
				<span class="active">微心愿</span>
			</p>
		</div>
		<div class="search_type">
			<div @click="changetype(1)" :class="{ischoose:searchType == 1}">{{communityName}} <img :src="searchType == 1?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowtop.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/arrowdown.png'">
			</div>
		</div>
		<div class="scroll" ref="scroll">
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
					<!-- <li v-for="item in list">{{item}}</li> -->
					<li v-for="item in list" :class="{isdone_back:item.activityStatusText == '已完成'}">
						<div class="w_title">
							<p :class="{isdone_p1:item.activityStatusText == '已完成'}">{{item.title}}</p>
							<p>
								<span class="get" @click="showWishForm(item.id)">认领</span>
							</p>
						</div>
						<div class="w_target">
							<div><span></span><p>{{item.communityName}}</p></div>
							<div v-if="item.tags"><span></span><p>{{item.tags}}</p></div>
						</div>
						<div class="w_content">
							<div class="time">最多认领名额: {{item.maxLimit}}个</div>
							<div class="jianshu"><span>活动简述：</span><p>{{item.brief}}</p></div>
							<!-- <div class="people">发布人：{{item.communityName}}</div> -->
						</div>
						<div class="w_bottom">
							<p>截至日期:{{item.signUpDeadline}}</p>
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
						<li v-for="(item,index) in communitylist" class="colorback" @click="changecommnity(item.communityId,item.commName)">{{item.commName}}<img :src="communityId == item.communityId?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gouquan.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/quan.png'"></li>
					</ul>
				</div>
				<div class="bottom">
					<div @click="resettypeone">重置</div>
					<div @click="submittypeone">确定</div>
				</div>
			</div>
			<div class="type_two" v-show="searchType == 2">
				<div  @click="changetypetwo(2)"><span :class="{ischoose:typetwo == 2}">最新</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gou.png" v-show="typetwo == 2"></div>
				<div @click="changetypetwo(1)"><span :class="{ischoose:typetwo == 1}">推荐</span><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gou.png" v-show="typetwo == 1"></div>
			</div>
			<div class="type_three" v-show="searchType == 3">
				<div v-for="(item,index) in typetree"><span :class="{ischoose:typetreenum == index}" @click="changetypethree(index)">{{item}}</span></div>
			</div>
		</div>
		<div class="getWish"  v-show="getWishFlag">
			<div class="bg" @click="showWishForm"></div>
			<div class="form">
				<p>
					<span>联系方式</span>
					<img src="@/assets/img/close.png" @click="showWishForm" alt="">
				</p>
				<input v-model="wishphone" placeholder="请输入手机号码" type="text">
				<div class="btn" @click="getWish">确认</div>
			</div>
		</div>
		<b-nav class="bottom-nav" :options="0"></b-nav>
		<!-- <b-nav :options="1"></b-nav> -->
	</div>
</template>
<script>
import nav from './bottomNav.vue'
import scroll from "../basetool/scroll.vue"
import {getCommunity,getActivityList,Req_getWish} from "../api/sendrequest.js"

export default{
	data(){
		return {
			list:[1],
			pullup: true,
			maskshow: false,
			searchType:0,
			typeone:0,
			typeone_two:0,
			typetwo:1,
			typetreenum:3,
			typetree:['报名中','已截止','已完成','全部'],
			communityId:'',
			communitylist:[],
			searchtext:'',
			page:1,
			communityName:'选择社区',
			wishphone: '',
			getWishFlag: false,
			wishId: ''
		}
	},
	methods : {
		toWishingWall() {
			this.$router.replace('/wishingwall')
		},
		showWishForm(wishId) {
			this.getWishFlag = !this.getWishFlag
			wishId ? this.wishId = wishId : ''
		},
		getWish() {
			if(this.wishphone.length !== 11 || Object.is(Number(this.wishphone),NaN)) {
				alert('请输入正确的手机号码')
				return
			}
			Req_getWish({
				activityId: this.wishId,
				mobile: this.wishphone
			}).then(res => {
				if(res.data.code === 0) {
					alert('认领成功')
				}else {
					alert(res.data.msg)
				}
				this.getWishFlag = false
			}).catch(err => alert('网络请求失败'))
		},
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
			if(this.typetwo == data){return}else{
				this.typetwo = data;
				this.maskshow = !this.maskshow;
				this.searchType = 0;
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
			pushdata.activityType = 3;
			this.page = 1;
			pushdata.page = 1;
			if(this.communityId != ''){
				pushdata.communityId = this.communityId;				
			}
			// pushdata.isRecommend = this.typetwo == 1?1:0;
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
		getcommunity(){
			getCommunity({size:1000}).then(data =>{
				// console.log(data);
				this.communitylist = data.data.list;
				this.communityId = localStorage.getItem('commid');
				data.data.list.forEach((item,index) => {
					if(item.communityId == this.communityId){
						this.communityName = item.commName;
						return;
					}
				})
			})
		},
		changecommnity(id,name){
			this.communityId = id;
			this.communityName = name?name:'全镇';
		},
		getactivity(){
			getActivityList({activityType:3,communityId:localStorage.getItem('commid')}).then(data => {
				// console.log(data);
				this.list = data.data.list;
				this.pullup = data.data.totalPage == this.page?false:true;
			})
		},
	getmoredata(page,type){
		if(type == 1){
		let pushdata ={};
			pushdata.activityType = 1;
			pushdata.page = page;
			if(this.communityId != ''){
				pushdata.communityId = this.communityId;				
			}
			pushdata.isRecommend = this.typetwo == 1?1:0;
			if(this.typetreenum != 3){
				pushdata.state = this.typetreenum + 1;
			}
			// console.log(pushdata);
			getActivityList(pushdata).then(data => {
				this.list =  this.list.concat(data.data.list);
				this.pullup = data.data.totalPage == this.page?false:true
			})
		}else{
			getActivityList({content:this.searchtext,activityType:1,page:page}).then(data => {
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
.littleWish{
	width: 100%;
	height: 100%;
	overflow: hidden;
		.bottom-nav {
		position: fixed;
		z-index: 9999;
		left: 0;
		bottom: 0;
		width: 100%;
	}
		.topNav {
		height: 100px;
		border-bottom: 1px solid #ddd;
		display: flex;
		font-size: 28px;
		p {
			flex: 1;
			line-height: 100px;
			text-align: center;
			color: #353535;
			position: relative;
			span {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%)
			}
			.active {
				border-bottom: 2px solid #f64e45;
			color: #f64e45;
			}
		}
	}
	.search_type{
		width: 100%;
		height: 88px;
		background-color: white;
		div{
			text-align: center;
			line-height: 88px;
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
		height: calc(100% - 88px);
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
					.get {
							border: 2px solid #f64e45;
							padding: 5px 25px;
							border-radius: 24px;
							color: #f64e45;
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
					// height: 120px;
					font-size: 24px;
					color: #999999;
					line-height: 40px;
					.jianshu{
						padding-top: 22px;
						padding-bottom: 20px;
						display: flex;
						// height: 40px;
						width: 600px;
						span{
							width: 120px;
						}
						p{
							flex:1;
							// overflow: hidden;
							// text-overflow:ellipsis;
							// white-space: nowrap;
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
		height: calc(100% - 88px);
		position: absolute;
		top: 88px;
		background-color: rgba(33, 33, 33, 0.7);
		z-index: 2;
	}
	.search_type_main{
		width: 100%;
		position: absolute;
		top: 88px;
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
			height: 175px;
			background-color: #F7F7F7;
			div{
				display: flex;
				padding-left: 51px;
				font-size: 30px;
				line-height: 87px;
				height: 50%;
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
	.getWish {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		.bg {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5)
		}
		.form {
			position: absolute;
			left: 50%;
			top: 40%;
			transform: translate(-50%,-50%);
			width: 590px;
			height: 335px;
			background: #fff;
			overflow: hidden;
			border-radius: 12px;
			p {
				height: 90px;
				background: #e55c5c;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
				text-align: center;
				line-height: 90px;
				position: relative;
				span {
					font-size: 24px;
					color: #fff;
				}
				img {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 20px;
					width: 40px;
				}
			}
			input {
				display: block !important;
				background: rgb(240, 240, 240);
				margin: 0 30px;
				margin-top: 35px;
				border: 0;
				height: 50px;
				outline: none;
				width: calc(100% - 60px);
				font-size: 24px;
				box-sizing: border-box;
				padding: 0 20px;
			}
			.btn {
				width: 240px;
				height: 84px;
				background: #999999;
				margin: 0 auto;
				margin-top: 43px;
				font-size: 30px;
				text-align: center;
				line-height: 84px;
				color: #fff;
				border-radius: 13px;
			}
		}
	}
}
</style>