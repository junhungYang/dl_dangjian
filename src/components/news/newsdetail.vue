<template>
	<div class="newsdetail1">
		<p @click="goback()" class="back">返回</p>
		<p class="title">{{detail.title}}</p>
		<p class="title1">{{detail.publisher}}&nbsp;{{detail.addTime}}</p>
		<div v-html="detail.contentDesc" class="content htmlbase1"></div>
	</div>
</template>
<script>
import {getnewdetail} from "../../api/sendrequest.js"
export default{
	data(){
		return{
			detail:''
		}
	},
	methods:{
		getdetail(){
			// console.log(this.$store.state.detailid);
			let id = this.$route.query.type ? this.$route.query.id:this.$store.state.detailid;
			getnewdetail({id:id}).then(data => {
				// console.log(data);
				this.detail = data.data;
			})
			// console.log(this.$store.state.shownewsdetail);
		},
		goback(){
			if(this.$route.query.type){
				this.$router.go(-1);
			}else{
			this.$store.commit('SETSHOWNEWSDETAIL',false);
		}
		}
	},
	created(){
		this.getdetail();
	}
}
</script>
<style lang="less">
.newsdetail1{
	.back{
		line-height: 82px;
		font-size: 30px;
		color: #999999;
		border-bottom: 1px solid #EEEEEE;
	}
	.title{
		padding-top: 45px;
		font-size: 45px;
		font-weight: bold;
	}
	.title1{
		font-size: 24px;
		color: #999999;
		padding-top: 46px;
		padding-bottom: 30px;
	}
	padding: 0 30px;
	height: 100%;
	overflow-y: auto;
	.content  p{
		font-size: 28px;
		color: #666666;
		padding: 30px 0;
	}
	img{
		margin-bottom: 10px;
	}
}
</style>