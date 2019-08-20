<template>
	<div class="score">
		<div class="top_nav">
			<div @click="changetype(1)">
				<p :class="{ischoose:type == 1}">服务积分</p>
				<span v-show="type == 1"></span>
			</div>
			<!-- <div @click="changetype(2)">
				<p :class="{ischoose:type == 2}">总积分</p>
				<span v-show="type == 2"></span>
			</div> -->
			<div @click="changetype(2)">
				<p :class="{ischoose:type == 2}">考勤积分</p>
				<span v-show="type == 2"></span>
			</div>
			<div @click="changetype(3)">
				<p :class="{ischoose:type == 3}">交党费积分</p>
				<span v-show="type == 3"></span>
			</div>
		</div>
		<div class="top_nav">
			<div @click="changetype(4)">
				<p :class="{ischoose:type == 4}">争先创优积分</p>
				<span v-show="type == 4"></span>
			</div>
			<div @click="changetype(5)">
				<p :class="{ischoose:type == 5}">民主评议积分</p>
				<span v-show="type == 5"></span>
			</div>
			<div @click="changetype(6)">
				<p :class="{ischoose:type == 6}">学习笔记积分</p>
				<span v-show="type == 6"></span>
			</div>
		</div>
		<div class="top_nav">
			<div @click="changetype(7)">
				<p :class="{ischoose:type == 7}">见义勇为积分</p>
				<span v-show="type == 7"></span>
			</div>
			<div @click="changetype(8)">
				<p :class="{ischoose:type == 8}">创新项目积分</p>
				<span v-show="type == 8"></span>
			</div>
		</div>
		<div class="top">
			<div><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/score.png"><span>累计积分</span><span>{{Integral}}分</span></div>
			<p>注：累积积分自报名参加活动之日起，参与者到现场签到，由工作人员统计审核，通过者即获得相应积分。</p>
		</div>
		<div class="content">
			<div class="noitem" v-if="list == ''"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/kong.png"><p>暂无积分记录</p></div>
			<ul>
				<li v-for="item in list">
					<div class="left">
						<p>{{item.detailName}}</p>
						<p>{{item.addTime}}</p>
					</div>
					<span class="right">+{{item.integral}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {getActivityIntegral} from '../api/sendrequest.js'
export default{
	data(){
		return{
			list:[],
			Integral:'',
			type:1
		}
	},
	created(){
		this.getlist()
	},
	methods:{
		getlist(){
			getActivityIntegral({state:this.type}).then(data => {
				// console.log(data);
				this.list = data.data.list;
				this.Integral = data.data.Integral;
			})
		},
		changetype(data){
			if(this.type == data){
				return;
			}else{
				this.type = data;
				this.getlist();
			}
		}
	}
}	
</script>
<style lang="less" scoped>
.score{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #fff;
	.top_nav{
		// width: 100%;
		height: 84px;
		background-color: white;
		display: flex;
		border-bottom: 1px solid #ddd;
		margin: 0 10px;
		div{
			flex:1;
			text-align: center;
			p{
				font-size: 30px;
				color: #999999;
				line-height: 80px;
			}
			span{
				max-width: 160px;
				height: 4px;
				border-radius: 2px;
				background-color: #f64e45;
				display: block;
				margin: 0 auto;
			}
			.ischoose{
				color: #333333;
			}
		}
	}
	.top{
		width: 100%;
		height: 174px;
		background-color: white;
		box-shadow:0px 2px 4px 0px rgba(181,181,181,0.2);
		border-top: 20px solid #eee;
		div{
			display: flex;
			height: 34px;
			line-height: 34px;
			padding: 31px 32px;
			border-bottom: 1px solid #EEEEEE;
			font-size: 30px;
			img{
				height: 100%;
			}
			span:nth-child(2){
				padding-left: 20px;
				flex:1;
			}
		}
		p{
			font-size: 20px;
			color: #999999;
			padding: 10px 33px;
		}
	}
	.content{
		width: 100%;
		height: calc(100% - 194px);
		overflow-y: auto;
		background-color: white;
				border-top: 20px solid #eee;
		.noitem{
			width: 400px;
			padding-top: 50px;
			margin: 0 auto;
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
				height: 125px;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				.left{
					flex:1;
					height: 100%;
					padding-left: 28px;
					p:nth-child(1){
						font-size: 30px;
						line-height: 80px;
					}
					p:nth-child(2){
						font-size: 24px;
						color: #666666;
					}
				}
				.right{
					line-height: 125px;
					font-size: 30px;
					padding-right: 50px;
					padding-left: 20px;
				}
			}
		}
	}	
}
	
</style>