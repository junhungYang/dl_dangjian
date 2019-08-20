<template>
	<div class="ranklist">
		<img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/tanhao.png" class="rankrule" @click="gorankrule()">
		<div class="rank_top">
			<div class="r_content">
            <div class="r_content_1" @click="showshequ(1)">
              <div class="imgbox">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rqb_2.png">
                <span :style="{background: 'url('+topdata[0].url+')'}"></span>
              </div>
              <p>{{topdata[0].text}}</p>
              <p>{{topdata[0].score}}</p>
              <span  class="color_box">2</span>
            </div>
            <div class="r_content_1" @click="showshequ(0)">
              <div class="imgbox">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rqb_1.png">
                  <span :style="{background: 'url('+topdata[1].url+')'}"></span>
              </div>
              <p>{{topdata[1].text}}</p>
              <p>{{topdata[1].score}}</p>
              <span  class="color_box">1</span>
            </div>
            <div class="r_content_1" @click="showshequ(2)">
              <div class="imgbox">
                <img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_rqb_3.png">
                <span :style="{background: 'url('+topdata[2].url+')'}"></span>
              </div>
              <p>{{topdata[2].text}}</p>
              <p>{{topdata[2].score}}</p>
              <span class="color_box">3</span>
            </div>
        </div>
		</div>
		<div :class="{xinyuan:type ==1 || type == 3,shequ:type == 2}">
			<div class="title"><div @click="changetype(3)"><span :class="{ischoose:type == 3}">党员服务榜</span><span v-show="type == 3"></span></div><div @click="changetype(1)"><span :class="{ischoose:type == 1}">党员积分榜</span><span v-show="type == 1"></span></div><div @click="changetype(2)"><span :class="{ischoose:type == 2}">党组织总榜</span><span v-show="type == 2"></span></div></div>
			<ul v-if="type == 1">
				<li v-for="(item,index) in ranklist" v-if="index>2 && index< 100"><span>{{index+1}}</span><span :style="{background: 'url('+item.imgUrl+')'}"></span><div><p>{{item.username}}</p><p>{{item.communityName}}</p></div><span>{{item.totalIntegral}}积分</span></li>
			</ul>
			<ul v-if="type ==2">
				<li v-for="(item,index) in ranklist2" v-if="index>2"><span>{{index+1}}</span><span :style="{background: 'url('+item.avatarUrl+')'}" @click="showshequ(index)"></span><div class="typetwoname"><p>{{item.communityName}}</p></div><span>{{item.activityCount}}次</span></li>
			</ul>
			<ul v-if="type == 3">
				<li v-for="(item,index) in ranklist3" v-if="index>2 && index< 100"><span>{{index+1}}</span><span :style="{background: 'url('+item.imgUrl+')'}"></span><div><p>{{item.username}}</p><p>{{item.communityName}}</p></div><span>{{item.serviceIntegral}}积分</span></li>
			</ul>
		</div>
		<div v-if="type == 1" class="my_rank"><span>{{mylist.rownum}}</span><span :style="{background: 'url('+mylist.avatar_url+')'}"></span><div><p>{{mylist.username}}</p><p>{{mylist.communityName}}</p></div><span>{{mylist.total_integral}}积分</span></div>
		<div v-if="type == 3" class="my_rank"><span>{{mylist2.rownum}}</span><span :style="{background: 'url('+mylist2.avatar_url+')'}"></span><div><p>{{mylist2.username}}</p><p>{{mylist2.communityName}}</p></div><span>{{mylist2.service_integral}}积分</span></div>
		<div class="mask" v-show="maskshow" @click="maskhide()"></div>
		<div class="maskbox" v-show="maskshow"><div class="top"><p>{{shequ.communityName}}</p><div><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/score.png"><span>{{shequ.activityCount}}次</span></div></div>
		<div class="content">
			<span>社区简介</span>
			<div>{{shequ.brief}}</div>
		</div>
	</div>
		<b-nav :options="2"></b-nav>
	</div>
</template>
<script>
import nav from './bottomNav.vue'
import {getUserOrder,getCommunityOrder,getmeorder,getuseractivityorder,getmeactivityorder} from "../api/sendrequest.js"
export default{
	data(){
		return {
			type:1,
			ranklist:[],
			ranklist2:[],
			ranklist3:[],
			mylist:'',
			mylist2:'',
			maskshow:false,
			shequ:''
		}
	},
	computed:{
		topdata(){
			switch(this.type){
				case 1:
				if(this.ranklist !=''){
					return [{text:this.ranklist[1].username,url:this.ranklist[1].imgUrl,score:this.ranklist[1].totalIntegral+'分'},
					{text:this.ranklist[0].username,url:this.ranklist[0].imgUrl,score:this.ranklist[0].totalIntegral+'分'},
					{text:this.ranklist[2].username,url:this.ranklist[2].imgUrl,score:this.ranklist[2].totalIntegral+'分'}]
				}else{
					return [{text:'',url:'',score:''},{text:'',url:'',score:''},{text:'',url:'',score:''}]
				}
				break;
				case 2:
				if(this.ranklist2 !=''){
					return [{text:this.ranklist2[1].communityName,url:this.ranklist2[1].avatarUrl,score:this.ranklist2[1].activityCount+'次'},
					{text:this.ranklist2[0].communityName,url:this.ranklist2[0].avatarUrl,score:this.ranklist2[0].activityCount+'次'},
					{text:this.ranklist2[2].communityName,url:this.ranklist2[2].avatarUrl,score:this.ranklist2[2].activityCount+'次'}]
				}else{
					return [{text:'',url:'',score:''},{text:'',url:'',score:''},{text:'',url:'',score:''}]
				}
				break;
				case 3:
				if(this.ranklist3 !=''){
					return [{text:this.ranklist3[1].username,url:this.ranklist3[1].imgUrl,score:this.ranklist3[1].serviceIntegral+'分'},
					{text:this.ranklist3[0].username,url:this.ranklist3[0].imgUrl,score:this.ranklist3[0].serviceIntegral+'分'},
					{text:this.ranklist3[2].username,url:this.ranklist3[2].imgUrl,score:this.ranklist3[2].serviceIntegral+'分'}]
				}else{
					return [{text:'',url:'',score:''},{text:'',url:'',score:''},{text:'',url:'',score:''}]
				}
				break;
			}
		}
	},
	methods:{
		changetype(data){
			this.type = data;
			switch(data){
				case 1:
				if(this.ranklist == ''){
					getUserOrder({size:100}).then(data => {
						this.ranklist = data.data.list;
				// console.log(this.ranklist);
			})
					getmeorder().then(data => {
						console.log(data);
					})
				}else{
					return;
				}
				break;
				case 2:
				if(this.ranklist2 == ''){
					getCommunityOrder({size:100}).then(data => {
						this.ranklist2 = data.data.list;
				// console.log(this.ranklist2);
			})
				}else{
					return ;
				}
				break;
				case 3:
				if(this.ranklist3 == ''){
					getuseractivityorder({size:100}).then(data => {
						this.ranklist3 = data.data.list;
				// console.log(this.ranklist2);
			})
				}else{
					return ;
				}
				break;
			}
		},
		getranklist(){
			// getCommunityOrder({size:100}).then(data => {
			// 	console.log(data);
			// })
			getUserOrder({size:100}).then(data => {
				// console.log(data);
				this.ranklist = data.data.list;
				// console.log(this.ranklist);
			})
			getmeorder().then(data => {
				this.mylist = data.data;
			})
			getmeactivityorder().then(data => {
				this.mylist2 = data.data;
			})
		},
		showshequ(id){
			if(this.type == 2){
				this.shequ = this.ranklist2[id];
				this.maskshow = !this.maskshow;
			}else{
				return;
			}
		},
		maskhide(){
			this.maskshow = false;
		},
		gorankrule(){
			this.$router.push({'path':'/scorerule'});
		}
	},
	components: {
		'b-nav':nav
	},
	created(){
		this.getranklist();
	}
}

</script>

<style lang="less" scoped>
	.ranklist{
		height: 100%;
		overflow: hidden;
		background:#EE6961;
		.rank_top{
			width: 530px;
			margin: 0 auto;
			height: 260px;
			position: relative;
			.r_content{
    			width: 100%;
    			height: 226px;
    			padding-top: 24px;
    			display: flex;
    			.r_content_1:nth-child(2){
    				margin-left: 10px;
    				margin-right: 10px;
    			}
    			.r_content_1{
      				width: 170px;
      				height: 100%;
      				overflow: hidden;
      				// position: relative;
      			.imgbox{
        			width: 100px;
        			position: relative;
        			left: calc(50% - 70px);
        			display: flex;
        		 span{
          			display: block;
          			width: 65px;
          			height: 65px;
          			border: 3px solid rgba(250,250,250,.7);
          			margin-top: 16px;
          			overflow: hidden;
         			border-radius: 50%;
         			background-size: cover !important;
         			background-position: center center !important;
         			background-repeat: no-repeat !important;
        			}
        			img{
          			width: 30px;
          			height: 35px;
        			}
      			}
     			 p{
        			margin: 0 auto;
        			padding-top: 10px;
        			font-size: 24px;
        			color: white; 
        			text-align: center;
        			text-overflow: ellipsis;
        			white-space: nowrap;
      			}
      			p:nth-child(3){
      				padding: 0;
      				font-size: 18px;
      			}
      			.color_box{
      				display: block;
      				position: absolute;
      				width: 170px;
      				height: 63px;
      				bottom: 0px;
      				background-color: #FDE55E;
      				font-size: 28px;
      				color:white;
      				line-height: 63px;
      				text-align:center;
      				font-weight: bold;
      			}
    			}
    			.r_content_1:nth-child(1){
      				.imgbox{
         				margin-top: 20px;
      			}
      				.color_box{
      					height: 50px;
      					background-color: #91C5FF;
      					line-height: 50px;
      				}
    			}
    			.r_content_1:nth-child(3){
    				.imgbox{
    					margin-top: 35px; 
    				}
    				.color_box{
    					height: 38px;
    					background-color: #FFB155;
    					line-height: 38px;
    				}
    			}
  				}
		}
		.xinyuan,.shequ{
			width: 100%;
			height: calc(100% - 466px);
			background-color: white;
			margin: 0 auto;
			width: 715px;
			border-radius: 20px 20px 0 0;
			overflow-y: hidden;
			.title{
				padding: 0 10px;
				height: 92px;
				display: flex;
				border-bottom: 1px solid #E8E8E8;
				div{
					width: 33.33%;
					span:nth-child(1){
						display: block;
						width: 100%;
						height: 88px;
						font-size: 30px;
						color:#999999;
						text-align: center;
						line-height: 88px;
					}
					span:nth-child(2){
						width: 170px;
						height: 4px;
						background-color: #f64e45;
						border-radius: 4px;
						display: block;
						margin: 0 auto;
					}
					.ischoose{
						color:black !important;
					}
				}
			}
			ul{
				padding: 0 40px;
				display: block;
				height: calc(100% - 92px);
				overflow-y: auto;
				li{
					width: 100%;
					display: flex;
					height: 110px;
					span:nth-child(1){
						display: block;
						line-height: 110px;
						font-size: 28px;
						width: 50px;
						text-align: center; 
					}
					span:nth-child(2){
						display: block;
						width: 67px;
						height: 67px;
						border-radius: 50%;
						overflow:hidden;
						background-color: grey;
						margin-top: 22px;
						background-position: center center !important;
						background-size: cover !important;
						background-repeat: no-repeat !important;
					}
					div{
						margin-left: 30px;
						width: 120px;
						padding: 20px 0;
						text-align: center;
						p:nth-child(1){
							font-size: 24px;
							color: black;
							line-height: 35px;
						}
						p:nth-child(2){
							font-size: 18px;
							color:#666666;
							line-height: 35px;
						}
					}
					.typetwoname{
						 width: 200px;
						 text-align: left;
						 p{
						 	line-height: 70px !important;
						 }
					}
					span:nth-child(4){
						display: block;
						flex:1;
						line-height: 110px;
						font-size: 24px;
						font-weight: bold;
						text-align: right;
					}
				}
			}
		}
		.shequ{
			height: calc(100% - 349px);
		}
		.my_rank{
			padding: 0 52px 0 73px;
			height: 116px;
			background-color: #f64e45;
			line-height: 116px;
			color:white;
			display: flex;
			align-items: center;
			span:nth-child(1){
						display: block;
						line-height: 116px;
						font-size: 28px;
						width: 80px;
						text-align: center; 
					}
					span:nth-child(2){
						display: block;
						width: 77px;
						height: 77px;
						border-radius: 50%;
						overflow:hidden;
						background-color: grey;
						// margin-top: 22px;
						border: 2px solid white;
						background-position: center center !important;
						background-repeat: no-repeat !important;
						background-size: cover !important;
					}
					div{
						margin-left: 30px;
						width: 150px;
						padding: 23px 0;
						// text-align: center;
												flex:1;
						p:nth-child(1){
							font-size: 28px;
							color: white;
							line-height: 35px;
						}
						p:nth-child(2){
							font-size: 22px;
							color:white;
							line-height: 35px;
						}
					}
					span:nth-child(4){
						display: block;
						line-height: 116px;
						font-size: 28px;
						font-weight: bold;
						text-align: right;
					}
		}
		.mask{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;
			left: 0;
			background-color: rgba(33,33,33,.7);
			z-index: 2;
		}
		.maskbox{
			width: 620px;
			background-color: white;
			border-radius: 20px;
			position: absolute;
			top:50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 3;
			overflow: hidden;
			.top{
				width: 100%;
				height: 180px;
				background-position:top left;
				background-size: cover;
				background-image: url('https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/shequ_back.png');
				background-repeat: no-repeat;
				>p{
					padding-right: 80px;
					padding-top: 50px;
					font-size: 36px;
					font-weight: bold;
					text-align: right;
					color: #333333;
				}
				div{
					padding-left: 370px;
					overflow: hidden;
					display: flex;
					img{
						height: 33px;
						margin-top: 5px;
					}
					span{
						font-size: 28px;
						color: #333333;
						padding-left: 10px;
					}
				}
			}
			.content{
				padding: 45px;
				span{
					font-size: 30px;
					color: #333333;
					font-weight: bold;
				}
				div{
					width: 100%;
					max-height: 230px;
					overflow-y: auto;
				}
			}
		}
		.rankrule{
			position: absolute;
			width: 35px;
			top: 30px;
			right: 30px;
		}
	}
</style>