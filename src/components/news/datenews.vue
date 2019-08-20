<template>
	<div class="datanews">
		<div class="scroll" ref="scroll">
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
					<!-- <li v-for="item in list">{{item}}</li> -->
					<li v-for="(item,index) in list" @click="godetail(item.id)">
						<div class="topone" v-if="index == 0" :style="{background: 'url('+item.coverImg+')'}">
							<p>{{item.title}}</p>
						</div>
						<div class="normal" v-else>
							<div class="left"><p>{{item.title}}</p>
							<div class="bottom"><img :src="item.publisherImg">
							<p>{{item.publisher}}</p>
							<p>{{item.addTime}}</p>
							</div>
							</div>
							<div class="right" :style="{background: 'url('+item.coverImg+')'}"></div>
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
			page:1
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
			getNewListall({type:1,page:this.page}).then(data => {
				// console.log(data);
				data.data.list.forEach((item,index) => {
					let a = item.addTime.split(' ');
					data.data.list[index].addTime = a[0];
				})
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
		}
	},
	components:{
		scroll
	}
}
</script>
<style lang="less" scoped>
.datanews{
	padding: 0 20px;
	padding-top: 20px;
	height: calc(100% - 20px);
	.scroll{
		width: 100%;
		height: 100%;
		overflow: hidden;
		ul{
			li{
				.topone{
					width: 100%;
					height: 360px;
					background-position: center center;
					background-size: cover;
					background-repeat: no-repeat;
					position: relative;
					p{
						font-size: 28px;
						color: white;
						text-align: left;
						position: absolute;
						width: 526px;
						margin: 0 auto;
						bottom: 42px;
						left: 50%;
						transform: translate(-50%, 0);
						font-weight: bold;
						line-height: 50px;
					}
				}
				.normal{
					display: flex;
					width: 100%;
					height: 225px;
					border-bottom: 1px solid #EEEEEE;
					.left{
						flex:1;
						height: 154px;
						margin-top: 41px;
						> P{
							color: #333333;
							font-size: 28px;
							height: 82px;
							overflow: hidden;
							font-weight: bold;
						}
						.bottom{
							display: flex;
							margin-top: 20px;
							width: 100%;
							height: 40px;
							img{
								display: block;
								height: 40px;
								width: 40px;
								border-radius: 50%;
								overflow: hidden;
								margin-right: 19px;
							}
							p{
								line-height: 40px;
								font-size: 24px;
								color: #999999;
							}
							p:nth-child(2){
								flex:1;
							}
						}
					}
					.right{
						margin-top: 41px;
						margin-left: 23px;
						width: 204px;
						height: 154px;
						background-position: center center !important;
						background-size: cover !important;
						background-repeat: no-repeat !important;
					}
				}
			}
		}
	}
}
</style>