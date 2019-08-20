<template>
	<div class="rule">
		<div class="main">
			<div><p><span></span>榜单说明</p><p>党员服务榜：每个党员的服务积分</br>党员总积分榜：每个党员的总积分</br>社区总榜：每个社区发起的党员服务中“已完成”的次数</p></div>
			<div><p><span></span>积分规则</p><p>1.按时参加会议。党员按时积极参加“三会一课”得4分。</br>
2.参与党员服务。积极参加社区组织开展的服务活动，并在活动中发挥党员先锋模范作用，如策划或者参与“暖心工程”活动、参与无职党员设岗定责并积极履职等2分。</p></div>
			<div><p><span></span>考核标准</p><p>党员积分制管理考核分实行百分制，基础分为零分，对党员履行义务和突出贡献情况进行加分，年度积分即为党员每年最终获得的总积分。</p></div>
		</div>
		<div class="back" @click="back()">返回</div>
	</div>
</template>
<script>
export default{
	data(){
		return{

		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		}
	}
}
</script>
<style lang="less" scoped>
.rule{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	background-image: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/scorerule.png');
	overflow: hidden;
	.main{
		margin: 51px 29px;
		height: calc(100% - 102px);
		overflow-y: auto;
		background-color: white;
		border-radius: 10px;
		> div:nth-child(1){
			margin-top: 120px;
		}
		> div{
			padding: 0px 34px;
			> p:nth-child(1){
				display: flex;
				height: 40px;
				font-size: 30px;
				line-height: 40px;
				color: #333333;
				font-weight: bold;
				overflow: hidden;
				span{
					display: inline-block;
					margin-top: 5px;
					width: 9px;
					height: 30px;
					background-color: #f64e45;
					margin-right: 19px;
				}
			}
			> p:nth-child(2){
				font-size: 26px;
				color: #666666;
				padding: 55px 0;
				line-height: 40px;
			}
		}
	}
	.back{
		width: 166px;
		height: 52px;
		position: absolute;
		top: 72px;
		left: 0px;
		border-radius: 0px 26px 26px 0px;
		color: white;
		text-align: center;
		line-height: 52px;
		font-size: 30px;
		background-color: #E17875;
	}
}
</style>