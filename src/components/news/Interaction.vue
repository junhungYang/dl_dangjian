<template>
	<div class="ineraction">
		<div class="release">
					<div @click="goupload">
						<img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/photo.png">
						<p>发布观点</p>
					</div>
				</div>
		<div class="scroll" ref="scroll">
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
					<!-- <li v-for="item in list">{{item}}</li> -->
					<li v-for="(item,index) in list">
						<div class="normal">
							<span :style="{background: 'url('+item.userImg+')'}"></span>
							<div class="contain">
								<p> {{item.username}}<span>{{item.addTime}}</span></p>
								<p v-text="item.contentDesc"><!-- <span>#助学活动#</span> --></p>
								<div class="imgbox">
									<img :src="item1.picUrl" v-for="item1 in item.picList" :class="{oneimg:item.picList.length == 1}" @click="imgshow(item1.picUrl)">
								</div>
								<div class="bottom">
									<p>{{item.communityName}}</p>
									<span @click="dianzan(index,item.isLike,item.id,item.likeCount)"><img :src="item.isLike == 1?'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/zan.png':'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/zan1.png'">{{item.likeCount}}</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</scroll>
		</div>
		<div class="maskbox" v-show="maskshow">
			<div class="mask" @click="maskclick()"></div>
			<img :src="maskimg">
		</div>
	</div>
</template>
<script>
import scroll from "../../basetool/scroll.vue"
import {getcommentlist,likeComment} from "../../api/sendrequest.js"
export default{
	data(){
		return {
			list:[],
			pullup:true,
			page:1,
			maskimg:'',
			maskshow:false
		}
	},
	methods:{
		loadUpData(){
			if(this.pullup){
				this.pullup = false;
				this.getlist();
			}else{
				return;
			}
		},
		goupload(){
			this.$router.push({'path':'/uploader?activityId='+this.$route.query.activityId});
		},
		getlist(){
			getcommentlist({page:this.page,size:10,activityId:this.$route.query.activityId}).then(data => {
				if(this.page == data.data.totalPage){
					this.pullup = false;
				}else{
					this.pullup = true;
					this.page = this.page+1;
				}
				this.list = this.list.concat(data.data.list);

			})
		},
		dianzan(index,flag,id,num){
				likeComment({id:id}).then(data => {
					this.list[index].isLike = this.list[index].isLike == 1?0:1;
					this.list[index].likeCount = this.list[index].isLike == 1?num + 1:num -1;
				})
		},
		imgshow(url){
			this.maskshow = true;
			this.maskimg = url;
		},
		maskclick(){
			this.maskshow = false;
		}
	},
	created(){
		this.getlist()
	},
	components:{
		scroll
	}
}
</script>
<style lang="less" scoped>
.ineraction{
	width: 100%;
	height: 100%;
			.release{
			width: 100%;
			height: 191px;
			background-color: #F7F7F7;
			overflow: hidden;
			div{
				width: 690px;
				height: 140px;
				margin: 0 auto;
				margin-top: 30px;
				background-color: white;
				box-shadow:0px 2px 4px 0px rgba(181,181,181,0.2);
				border-radius:10px;
				overflow: hidden;
				img{
					display: block;
					margin: 0 auto;
					height: 50px;
					margin-top: 35px;
				}
				p{
					font-size: 24px;
					text-align: center;
					color: #666666;
					padding-top: 5px;
				}
			}
		}
	.scroll{
		width: 100%;
		height: calc(100% - 191px);
		overflow: hidden;
		ul{
			padding: 0 20px;
			li{
				.normal{
					display: flex;
					width: 100%;
					overflow: hidden;
					border-bottom: 1px solid #EEEEEE;
					> span{
						width: 68px;
						height: 68px;
						border-radius: 50%;
						background-color: red;
						margin-left: 7px;
						margin-top: 19px;
						background-position: center center !important;
						background-size: cover !important;;
						background-repeat: no-repeat !important;
					}
					.contain{
						flex:1;
						margin-left: 21px;
						padding-right: 30px;
						padding-top: 19px;
						> p:nth-child(1){
							font-size: 30px;
							line-height: 60px;
							color: #666666;
							span{
								font-size: 20px;
								color: #999999;
								padding-left: 23px;
							}
						}
						> p:nth-child(2){
							font-size: 24px;
							color: #333333;
							line-height: 35px;
							padding-top: 10px;
							span{
								font-size: 24px;
								color: #f64e45;
							}
						}
						.imgbox{
							margin-top: 30px;
							width: 540px;
							clear: both;
							img{
								width: 169px;
								height: 123px;
								margin-right: 10px;
								display: inline-block;
								margin-bottom: 20px;
							}
							.oneimg{
								width: 299px;
								height: 217px;
							}
						}
						.bottom{
							width: 100%;
							display: flex;
							color: #999999;
							padding-bottom: 28px;
							> p{
								flex:1;
								font-size: 20px;
							}
							span{
								font-size: 20px;
								margin-left: 43px;
								img{
									height: 17px;
									margin-right: 12px;
								}
							}
						}
					}
				}
			}
		}
	}
	.maskbox{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		.mask{
			width: 100%;
			height: 100%;
			background-color: rgba(181,181,181,0.7);
		}
		img{
			max-height: 80%;
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>