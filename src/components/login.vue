<template>
	<div class="login">
		<img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/login.png" class="login_top">
		<div class="center">
			<div class="phone"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/phone.png"><input v-model="idcard" type="text" placeholder="请输入身份证号码" class="logininput"></div>
			<div class="password"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/password.png"><input v-model="password" type="password" placeholder="请输入密码" class="logininput"></div>
		</div>
		<div class="gologin" @click="gologin">登录</div>
		<div class="errormsg" v-show="errorshow">{{errormsg}}</div>
	</div>
</template>
<script>
import {login} from "../api/sendrequest.js"
export default{
	data(){
		return{
			idcard:'',
			password:'',
			errormsg:'',
			errorshow:false,
			lastpath:''
		}
	},
	methods:{
		gologin(){
			// console.log(this.idcard,this.password);
			console.log(this.lastpath);
			if(this.idcard == ''){
				this.errormsg = '请输入身份证号码';
					this.errorshow = true;
					this.timeout = setTimeout(() => {
						this.errorshow = false;
					},2000);
					return false;
			}
			if(this.password == ''){
				this.errormsg = '请输入密码';
					this.errorshow = true;
					this.timeout = setTimeout(() => {
						this.errorshow = false;
					},2000);
					return false;
			}
			login({idCard:this.idcard,password:this.password}).then(data =>{
				console.log(data);
				if(data.data.token){
					localStorage.setItem('token',data.data.token);
					localStorage.setItem('commid',data.data.communityId);
					// this.$store.dispatch('settoken',data.data.token);
					this.$router.push({'path':this.lastpath});
				}else{
					this.errormsg = data.data.msg;
					this.errorshow = true;
					this.timeout = setTimeout(() => {
						this.errorshow = false;
					},2000)
				}
			})
		}
	},
	beforeRouteEnter (to, from, next){
		// console.log(from);
		next( vm => {
			vm.lastpath = from.fullPath;
		});
	}
}	
</script>
<style lang="less" scoped>
.login{
	width: 100%;
	height: 100%;
	background-color: white;
	overflow: hidden;
	.login_top{
		width: 100%;
	}
	.center{
		width: 100%;
		overflow: hidden;
		.phone , .password{
			width: 526px;
			height: 74px;
			margin: 0 auto;
			display: flex;
			border: 3px solid #f64e45;
			border-radius: 40px;
			margin-top: 40px;
			overflow: hidden;
			img{
				margin-top: 16px;
				margin-left: 43px;
				margin-right: 44px;
				height: 47px;
			}
			input{
				flex: 1;
				height: 21px;
				padding: 26px 0;
				border: 0px;
				color: #f64e45;
				font-size: 21px;
				outline: none;
			}
			.logininput::-webkit-input-placeholder {
				color: #f64e45;
			}
			.logininput:-moz-placeholder {
				color: #f64e45;
			}
			.logininput:-ms-input-placeholder {
				color: #f64e45;
			}

		}
	}
	.gologin{
		background-color: #f64e45;
		color: white;
		width: 526px;
		height: 81px;
		text-align: center;
		line-height: 81px;
		font-size: 38px;
		margin: 0 auto;
		border-radius: 40px;
		margin-top: 83px;
		cursor: pointer;
	}
	.errormsg{
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20px;
		border-radius: 20px;
		background-color: #f64e45;
		color: white;
		font-size: 28px;
	}
}

</style>