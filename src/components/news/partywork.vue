<template>
	<div class="partywork">
		<div class="topnav">
			<div>
			<span @click="changetype(1)">党务基础知识</span>
			<span @click="changetype(2)">政治学习资料</span>
			<span @click="changetype(3)">工作文件通知</span>
			</div>
		</div>
		<div class="scroll" ref="scroll">
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
					<!-- <li v-for="item in list">{{item}}</li> -->
					<li v-for="(item,index) in list" @click="godetail(item.id)">
						<div class="normal">
							<span></span>
							<div class="left"><p>{{item.title}}</p>
								<p>{{item.addTime}}</p></div>
						</div>
					</li>
				</ul>
			</scroll>
		</div>
	</div>
</template>
<script>
import scroll from "../../basetool/scroll.vue"
import {getNewListall} from "../../api/sendrequest.js"
export default{
	data(){
		return {
			list:[],
			pullup:true,
			page:1,
			type:''
		}
	},
	created(){
		this.getnewlist();
	},
	methods:{
		loadUpData(){
			if(this.pullup){
				this.pullup = false;
				this.getnewlist();
			}else{
				return;
			}
		},
		getnewlist(){
			let pushdata = {type:2,page:this.page}
			if(this.type != ''){
				pushdata.state = this.type
			}
			getNewListall(pushdata).then(data => {
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
		godetail(id){
			this.$store.commit('SETSHOWNEWSDETAIL',true);
			this.$store.commit('SETDETAILID',id);
		},
		changetype(id){
			if(id == this.type){
				return;
			}else{
			this.type = id;
			this.page = 1;
			let pushdata = {type:2,page:this.page,state:id}
			getNewListall(pushdata).then(data => {
				// console.log(data);
				if(this.page == data.data.totalPage){
					this.pullup = false;
				}else{
					this.pullup = true;
					this.page = this.page+1;
				}
				this.list = data.data.list;
			})
		}
		}
	},
	components:{
		scroll
	}
}
</script>
<style lang="less" scoped>
.partywork{
	min-height: 100%;
	background-color: #F7F7F7;
	.topnav{
		width: 100%;
		height: 145px;
		background-color: #F5F5F5;
		overflow: hidden;
		div{
			width: 690px;
			height: 83px;
			margin: 0 auto;
			margin-top: 32px;
			display: flex;
			overflow: hidden;
			span{
				width: 208px;
				height: 83px;
				line-height: 83px;
				font-size: 26px;
				color: #455494;
				text-align: center;
				background-color: white;
			}
			span:nth-child(2){
				margin-left: 22px;
				margin-right: 22px;
			}
		}
	}
	.scroll{
		width: 100%;
		height: calc(100% - 200px);
		overflow: hidden;
		ul{
			li{
				width: 100%;
				background-color: white;
				.normal{
					display: flex;
					padding: 0 30px;
					height: 175px;
					border-bottom: 1px solid #EEEEEE;
					span{
						display: block;
						width:16px;
						height:16px;
						border-radius: 50%;
						background-color: #f64e45;
						margin-right: 20px;
						margin-top: 36px;
					}
					.left{
						flex:1;
						height: 154px;
						margin-top: 26px;
						P:nth-child(1){
							color: #333333;
							font-size: 28px;
							height: 82px;
							overflow: hidden;
							font-weight: bold;
						}
						p:nth-child(2){
							color: #999999;
							font-size: 24px;
							margin-top: 20px;
						}
					}
				}
			}
		}
	}
}
</style>