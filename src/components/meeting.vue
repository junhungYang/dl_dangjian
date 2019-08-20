<template>
	<div class="meeting">
		<div class="main">
		<div class="topimg" :style="{background: 'url('+detaillist.picUrl+')'}">
			<!-- <img :src="detaillist.picUrl"> -->
		</div>
		<div class="title">
			<p>{{detaillist.title}}</p>
			<p>{{detaillist.integral}}分</p>
		</div>
<!-- 		<div class="endtime">
			<p>此会议报名截止至</p>
			<p>{{signUpDealine[0]}}</p>
			<p>{{signUpDealine[1]}}</p>
		</div> -->
		<div class="joinnum">
			<p>&nbsp;</p>
			<div :class="{changheight:!moreicon}">
				<div><span v-for="(item,index) in join">
					<img :src="item.userImg" v-if="index != 6">
					<img :src="item.userImg" v-else @click="getmore">
				</span></div>
				<p><span>已请假</span><span>{{detaillist.peopleCount}}<span>人</span></span></p>
			</div>
		</div>
		<div class="acttime">
			<p>会议时间</p>
			<div>
				<p>{{detaillist.startTime}}</p>
				<p>{{detaillist.endTime}}结束</p>
			</div>
		</div>
		<div class="actdetail">
			<p>会议详情</p>
			<div class="content htmlbase" v-html="detaillist.contentDesc">
				
			</div>
		</div>
		<div class="address">
			<div class="left" :style="{background: 'url('+shequimg+')'}"></div>
			<div class="centent"><p>{{detaillist.communityName}}</p></div>
			<div class="right" @click="phonecall()"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/phoneicon.png"><p>联系人:{{detaillist.contactPerson}}</br>电话:{{detaillist.contactNumber}}</p><a :href="'tel:'+ detaillist.contactNumber" v-show="false" ref="phone"></a></div>
		</div>
		<div class="address1">
			<p>集合地址</p>
			<div @click="gomap()"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/mapicon.png"><p>{{detaillist.collectionAddress}}</p></div>
		</div>
		<!-- <div class="scorerule">
			<p>积分规则</p>
			<p>1.&nbsp;按工时：4小时=8分&nbsp;/&nbsp;2.&nbsp;按天数：1天=10分</p>
		</div> -->
		<div class="notice">
			<p>注意事项:</p>
			<div class="htmlbase" v-html="detailnotice"></div>
		</div>
	</div>
	<div class="bottom">
		<div @click="back">返回</div>
		<div @click="showLeaveForm">我要请假</div>
		<!-- <div @click="shownotice" v-text="detaillist.activityStatus == 1?'报名参与':detaillist.activityStatusText" :class="{colorgrey:detaillist.activityStatus != 1}"></div> -->
	</div>
	<div class="mask" v-show="maskshow"></div>
	<div class="noticebox" v-show="maskshow">
		<p>报名详情 <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/close.png" @click="closenotice"></p>
		<div class="content"><p>注意事项:</p>
			<div class="htmlbase" v-html="detailnotice"></div>
		</div>
		<div class="bottom1" @click="submitrule"><img :src="issubmit?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/gouquan.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/quan.png'"><p>本人已同意参与本次会议</p></div>
		<div :class="{submit:true,submit1:issubmit}" @click="gosign()">确定</div>
	</div>
	<div class="errorbox" v-show="errorshow">{{errormsg}}</div>
	<div class="leaveForm" v-show="leaveFlag">
		<div class="bg"></div>
		<div class="box">
			<p>
				<span>我要请假</span>
				<img src="@/assets/img/close.png" @click="showLeaveForm" alt="">
			</p>
			<input v-model="leaveReason" placeholder="请输入请假原因" type="text">
			<div class="btn" @click="leaveSubmit">确认</div>
		</div>
	</div>
</div>
</template>
<script>
import {getActivityDetail,signupactivity, Req_applyLeave} from "../api/sendrequest.js"
export default{
	data(){
		return {
			detaillist:[],
			joinnum:[],
			moreicon:false,
			maskshow:false,
			issubmit:false,
			signUpDealine:'',
			activityStatus:false,
			errorshow:false,
			errormsg:'',
			leaveFlag: false,
			leaveReason: ''
		}
	},
	computed :{
		join(){
			if(this.joinnum.length > 6){
				let a = [];
				this.joinnum.forEach((item,index) => {
					if(index == 6){
						a.push({userImg:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/getmore.png'})
						a.push(item);
					}else{
						a.push(item);
					}
				})
				return a;
			}else{
				return this.joinnum
			}
		},
		detailnotice(){
			if(this.detaillist.precautions){
				return this.detaillist.precautions.replace(/\n|\r\n/g,"<br/>");
			}else{
				return '';
			}
		},
		shequimg(){
			if(this.detaillist.community){
				return this.detaillist.community.avatarUrl;
			}else{
				return '';
			}
		}
	},
	mounted(){

	},
	methods:{
		leaveSubmit() {
			if(!this.leaveReason) {
				alert('请输入请假原因')
				return
			}
			Req_applyLeave({
				activityId: this.detaillist.id,
				reason: this.leaveReason
			}).then(res => {
				if(res.data.code === 0) {
					alert('请假成功')
		this.getdetail();
					this.leaveFlag = false
				}else if(res.data.code === 400){
					alert(res.data.msg)
					this.$router.replace('/login')
				}else {
					alert(res.data.msg)
				}
			}).catch(err => alert(err))
		},
		showLeaveForm() {
			this.leaveFlag = !this.leaveFlag
			// wishId ? this.wishId = wishId : ''
		},
		getmore(){
			this.moreicon = !this.moreicon;
		},
		submitrule(){
			this.issubmit = !this.issubmit;
		},
		closenotice(){
			this.maskshow = false;
		},
		shownotice(){
			if(this.activityStatus && this.activityStatus == 1){
				this.maskshow = !this.maskshow;
			}else{
				return;
			}
		},
		getdetail(){
			getActivityDetail({activityId:this.$route.query.id}).then(data => {
				console.log(data);
				this.detaillist = data.data;
				this.joinnum = data.data.recordList;
				this.activityStatus = data.data.activityStatus;
				let a = data.data.signUpDealine.split(' ');
				this.signUpDealine = a;
		})
		},
		back(){
			if (window.history.length <= 1) {
				this.$router.push({path:'/wishingwall'})
				return false;
			} else {
				this.$router.push('/meetingList')
			}
		},
		phonecall(){
			this.$refs.phone.click();
		},
		gosign(){
			signupactivity({activityId:this.detaillist.id}).then(data => {
				this.$router.go(-1);
			},error => {
				// console.log(error);
				this.maskshow = false;
				this.errorshow = true;
				this.errormsg = error.msg;
				var a = setTimeout(() => {
					this.errorshow = false;	
				},2000);
			})
		},
		gomap(){
			this.$router.push({'path':'/map?lng='+this.detaillist.longitude+'&lat='+this.detaillist.latitude});
		}
	},
	created(){
		this.getdetail();
	}
}	
</script>
<style lang="less" scoped>
.meeting{
	width: 100%;
	background-color: #F5F5F5;
	height: 100%;
	overflow: hidden;
	.main{
		width: 100%;
		height: calc(100% - 100px);
		overflow-y: auto;
		.topimg{
		width: 100%;
		height: 380px;
		background-color: white;
		overflow: hidden;
		background-position: center center !important;
		background-size: cover !important;
		background-repeat: no-repeat !important;
	}
	.title{
		width: 100%;
		height: 103px;
		display: flex;
		background-color: white;
		margin-top: 10px;
		p{
			height: 100%;
		}
		p:nth-child(1){
			flex:1;
			padding-left: 51px;
			line-height: 103px;
			font-size: 34px;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: bold; 
		}
		p:nth-child(2){
			padding-right: 50px;
			color: #EB4A48;
			font-size: 28px;
			line-height: 103px;
		}
	}
	.endtime{
		width: 100%;
		height: 66px;
		display: flex;
		background-color: white;
		margin-top: 10px;
		p{
			height: 100%;
			line-height: 66px;
		}
		p:nth-child(1){
			padding-left: 51px;
			font-size: 28px;
		}
		p:nth-child(2){
			flex:1;
			text-align: right;
			padding-right: 20px;
			font-size: 28px;
		}
		p:nth-child(3){
			font-size: 24px;
			padding-right: 52px;
		}
	}
	.joinnum{
		width: 100%;
		margin-top: 10px;
		background-color: white;
		padding-bottom: 29px;
		p{
			line-height: 40px;
			font-size: 24px;
			padding-left: 49px;
			color: #333333;
		}
		.changheight{
			height: 80px;
			overflow: hidden;
		}
		> div{
			display: flex;
			div{
				padding-left: 50px;
				flex:1;
				clear: both;
				span{
					display: block;
					float: left;
					width: 60px;
					height: 60px;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 15px;
					margin-top: 19px;
					img{
						width: 100%;
						display: block;
						margin: 0 auto;
					}
				}
			}
			p{
				height: 79px;
				width: 155px;
				border-left: 1px solid #E8E8E8;
				padding: 0px;
				> span{
					display: block;
					width: 100%;
					text-align: center;
				}
				span:nth-child(1){
					font-size: 24px;
					padding-top: 10px;
				}
				span:nth-child(2){
					color: #f64e45;
					font-size: 24px;
					span{
						color: #353535;
					}
				}
			}
		}
	}
	.acttime{
		width: 100%;
		height: 110px;
		background-color:white;
		margin-top: 10px;
		display: flex;
		> p{
			font-size: 28px;
			padding-top: 20px;
			padding-left: 49px;
			flex:1;	
			color: #333333;
		}
		div{
			padding-top: 20px;
			padding-right: 54px;
			p:nth-child(1){
				color: #333333;
				font-size: 24px;
			}
			p:nth-child(2){
				color: #999999;
				font-size:20px;
				padding-top: 15px;
			}
		}
	}
	.actdetail{
		padding: 31px 50px;
		background-color: white;
		> p{
			padding-left: 3px;
			font-size: 28px;
			color: #333333;
		}
	}
	.address{
		height: 102px;
		padding: 18px 51px;
		display: flex;
		background-color: white;
		margin-top: 10px;
		overflow: hidden;
		.left{
			width: 62px;
			height: 62px;
			background-position: center centent !important;
			background-size: cover !important;
			background-repeat: no-repeat;
			margin-top: 20px;
		}
		.centent{
			padding-left: 17px;
			flex:1;
			height: 100%;
			border-right: 1px solid #E8E8E8;
			p:nth-child(1){
				font-size: 30px;
				color: #333333;
				font-weight: bold;
				line-height: 102px;
			}
		}
		.right{
			padding-top: 20px;
			height: 100%;
			display: flex;
			img{
				height: 44px;
				display: block;
				margin-left: 40px;
				margin-top: 10px;
			}
			p{
				text-align: left;
				margin-left: 28px;
				line-height: 40px;
				font-size: 24px;

			}
		}
	}
	.address1{
		padding: 25px 52px;
		background-color: white;
		margin-top: 10px;
		> p{
			font-size: 28px;
			color: #333333;
		}
		div{
			margin-top: 38px;
			display: flex;
			img{
				width: 16px;
				height: 23px;
			}
			p{
				font-size: 24px;
				color: #8E8E8E;
				padding-left: 20px;
			}
		}
	}
	.scorerule{
		padding: 26px 50px;
		background-color: white;
		p:nth-child(1){
			font-size: 28px;
			color: #333333;
		}
		p:nth-child(2){
			padding-top: 28px;
			font-size: 24px;
			color: #8E8E8E;
			letter-spacing: 5px;
		}
	}
	.notice{
		padding: 26px 50px;
		background-color: white;
		margin-top: 10px;
		> p:nth-child(1){
			font-size: 28px;
			color: #666666;
		}
		div{
			padding: 0 50px;
			font-size: 24px;
			color: #666666;
			line-height: 40px;
		}
	}
	}
	.bottom{
		width: 100%;
		height: 100px;
		background-color: #eee;;
		display: flex;
		div:nth-child(1){
			flex:1;
			text-align:center;
			line-height: 100px;
			font-size:28px;
			color: #666666;
		}
		div:nth-child(2){	
			flex:1;
			line-height: 100px;
			text-align: center;
			background-color: #f64e45;
			color: white;
			font-size: 34px;
		}
		.colorgrey{
			background-color: #F5F5F5 !important;
			color:black !important;
		}
	}
	.mask{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(33,33,33,.7);
		top: 0px;
		z-index: 2;
	}
	.noticebox{
		position: absolute;
		width: 588px;
		height: 658px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		z-index: 3;
		border-radius: 10px;
		overflow:hidden;
		> p{
			width: 100%;
			height: 89px;
			line-height: 89px;
			font-size: 36px;
			color: white;
			background-color: #f64e45;
			text-align: center;
			position: relative;
			img{
				display: block;
				float: right;
				height: 50px;
				position: absolute;
				top: 20px;
				right: 30px;
			}
		}
		.content{
			width: 499px;
			height: 347px;
			margin: 0 auto;
			margin-top: 33px;
			margin-bottom: 20px;
			background-color: white;
			overflow-y: auto;
			font-size: 24px;
			color: #999999;
			> p{
				padding: 37px 39px 0 37px;
			}
			div{
				padding: 0 39px;
				line-height: 40px;
			}
		}
		.bottom1{
			display: flex;
			height: 30px;
			padding: 0  140px 20px 110px;
			img{
				height: 30px;
				margin-right: 19px;
			}
			p{
				font-size: 24px;
				line-height: 30px;
				color: #333333;
				text-align: center;
				flex:1;
			}
		}
		.submit{
			width: 242px;
			height: 80px;
			background-color: #999999;
			border-radius:10px;
			line-height: 80px;
			color: white;
			font-size: 30px;
			margin:0 auto;
			text-align: center;
		}
		.submit1{
			background-color: #f64e45;
		}
	}
	.errorbox{
		position: absolute;
		max-width: 450px;
		left: 50%;
		top:50%;
		transform: translate(-50%, -50%);
		font-size: 28px;
		background-color: rgba(33,33,33,.7);
		color:white;
		padding: 20px;
		border-radius: 20px;
	}
	.leaveForm {
		position: fixed;
		width: 100%;
		height: 100%;
		left:0;
		top: 0;
		.bg {
			width: 100%;
			height:100%;
			background: rgba(0,0,0,0.5)
		}
		.box {
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
					width: 40px;
					right: 20px;
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