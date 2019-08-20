<template>
	<div class="upload">
		<div class="top"><span @click="back">退出</span><span @click="upload">发布</span></div>
		<div class="contain">
			<textarea placeholder="发布动态" v-model="pushtext"></textarea>
			<div class="imgbox">
				<div>
					<span v-for="(item,index) in files"><img :src="item"><span v-show="loadingshow[index]"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/loading.gif">
					</span></span>
					<span v-show="uploadfiles.length < 6"><img src="https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/addimg.png" @click="chooseimg"></span>
				</div>
				<span>图片: 6/{{uploadfiles.length}}</span>
			</div>
		</div>
		<input type="file"  accept="image/*"
            @change="selectImgs" ref="file"
          v-show="false">
          <div class="tips" v-show="showerror">{{errortext}}</div>
	</div>
</template>
<script>
import {_upload,pushactivity} from '../../api/sendrequest.js'
export default{
	data(){
		return {
			files:[],
			uploadfiles:[],
			loadingshow:[false,false,false,false,false,false],
			pushtext:'',
			showerror:false,
			errortext:''
		}
	},
	methods:{
		chooseimg(){
			this.$refs.file.click();
		},
		selectImgs(e){
			let fileList = this.$refs.file.files;
				let reader = new FileReader();
				reader.readAsDataURL(fileList[0]);
				reader.onload = (e) => {
				// console.log(e.target.result);
				this.files.push(e.target.result);
				this.loadingshow[this.files.length - 1] = true;
			}
			let pushdata = new FormData();
			pushdata.append('file',fileList[0]);
			_upload(pushdata).then(data => {
				// console.log(data);
				this.loadingshow[this.files.length -1 ] = false;
				this.uploadfiles.push(data.msg);
			})
			// console.log(this.files);
		},
		upload(){
			// console.log(this.uploadfiles);
			// console.log(this.pushtext);
			if(this.pushtext != ''){
				let pushdata = {};
				pushdata.contentDesc = this.pushtext;
				if(this.uploadfiles != ''){
					pushdata.imageUrlList = this.uploadfiles;
				}
				pushactivity(pushdata).then(data => {
					this.showerror = true;
					this.errortext ='发布成功,请等待审核'
					let a = setTimeout(() => {
						this.$router.go(-1);
					},2000);
				})
			}else{
				this.showerror = true;
				this.errortext = '请输入内容';
				let a = setTimeout(() => {
					this.showerror = false;
				},2000)
			}
		},
		back(){
			this.$router.go(-1);
		}
	}
}
</script>
<style lang="less" scoped>
.upload{
	padding: 0 30px;
	height: 100%;
	overflow-y: auto;
	background-color: #F7F7F7;
	.top{
		width: 100%;
		height: 95px;
		line-height: 95px;
		font-size: 30px;
		span:nth-child(1){
			display: block;
			width: 100px;
			float: left;
			height: 100%;
			color: #999999;
		}
		span:nth-child(2){
			display: block;
			float: right;
			width: 100px;
			height: 100%;
			color: #E44848;
		}
	}
	.contain{
		width: 690px;
		min-height: 368px;
		box-shadow:0px 2px 4px 0px rgba(181,181,181,0.2);
		border-radius: 10px;
		margin: 0 auto;
		background-color: white;
		textarea{
			border: 0px;
			outline: none;
			min-height: 200px;
			font-size: 24px;
			color: #666666;
			width: calc(100% - 56px);
			padding: 36px 26px 20px 26px;

		}
		.imgbox{
			padding: 0 23px 29px 32px;
			display: flex;
			align-items: flex-end;
			div{
				flex:1;
				clear: both;
				> span{
					display: block;
					width: 96px;
					height: 96px;
					float: left;
					margin-right: 20px;
					margin-top: 10px;
					position: relative;
					overflow:hidden;
					img{
						width: 100%;
						height: 100%;
					}
					span{
						position:absolute;
						width:96px;
						height: 96px;
						top: 0px;
						left: 0px;
						overflow:hidden;
						background-color: rgba(181,181,181,0.7);
						img{
							display:block;
							height: 80px;
							margin:0 auto;
							margin-top: 8px;
						}
					}
				}
			}
			> span{
				font-size: 24px;
				color: #999999;
			}
		}
	}
	.tips{
		max-width: 300px;
		text-align: center;
		position: absolute;
		padding: 20px 30px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 28px;
		color: white;
		background-color: #666666;
		border-radius: 10px;
	}
}

</style>