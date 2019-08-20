<template>
	<div class="mypic">
		<div class="scroll" ref="scroll">
			<div class="noitem" v-if="list == ''"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/noimg.png"><p>你还没有发布过图片</p></div>
			<scroll v-if="list.length" :loadDatas="list" :pullUpLoad="pullup"  @pullingUp="loadUpData">
				<ul>
					<!-- <li v-for="item in list">{{item}}</li> -->
					<li v-for="(item,index) in list">
						<p>{{item.addTime}}</p>
						<div class="imgbox"><img :src="item1.picUrl" v-for="item1 in item.picList"></div>
					</li>
				</ul>
			</scroll>
		</div>
	</div>
</template>

<script>
import scroll from "../basetool/scroll.vue"
import {getOurPic} from "../api/sendrequest.js"
export default{
	data(){
		return{
			list:[],
			pullup:true,
			page:1
		}
	},
	created(){
		this.getlist();
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
		getlist(){
			getOurPic({page:this.page}).then(data => {
				// console.log(data);
				if(this.page == data.data.totalPage){
					this.pullup = false;
				}else{
					this.pullup = true;
					this.page = this.page+1;
				}
				// this.list = this.list.concat(data.data.list);
			})
		}
	},
	components:{
		scroll
	}
}
</script>
<style lang="less" scoped>
.mypic{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.scroll{
		width: 100%;
		height: 100%;
		overflow: hidden;
		.noitem{
			width: 400px;
			position: absolute;
			top:50%;
			left: 50%;
			transform: translate(-50%, -50%);
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
			li{
				width: 100%;
				p{
					padding: 36px 29px 22px 29px;
					font-size: 24px;
					color: #666666;
				}
				.imgbox{
					padding: 0 29px;
					img{
						display: inline-block;
						width: 217px;
						height: 162px;
					}
					img:nth-child(2n){
						margin-left: 16px;
						margin-right: 16px;
					}
				}
			}
		}
	}
}
</style>