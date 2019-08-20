<template>
	<div class="juzhen">
		<div class="group">
			<p>A</p>
			<ul>
				<li><span :style="{background: 'url('+imgurl+')'}"></span>岐阳社区</li>
				<li><span :style="{background: 'url('+imgurl+')'}"></span>岐阳社区</li>
				<li><span :style="{background: 'url('+imgurl+')'}"></span>岐阳社区</li>
				<li><span :style="{background: 'url('+imgurl+')'}"></span>岐阳社区</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			imgurl:'https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/upload/20181224/45c8f3a7b9fa41928f0e39afa7253bd0.png'
		}
	},
	created(){

	}
}
</script>
<style lang="less" scoped>
.juzhen{
	width: 100%;
	height: 100%;
	background-color: #F7F7F7;
	.group{
		width: 100%;
		p{
			height: 98px;
			line-height: 98px;
			font-size: 40px;
			color: #333333;
			font-weight: bold;
			padding-left: 49px;
		}
		ul{
			width: 100%;
			li{
				display: block;
				float:left;
				width: 228px;
				margin-left: 15px;
				text-align: center;
				margin-bottom: 18px;
				background-color: #EEEEEE;
				padding: 11px 0;
				span{
					width: 96px;
					height: 96px;
					border-radius: 50%;
					overflow: hidden;
					background-position: center center;
					background-size: cover;
					background-repeat: no-repeat;
					display: block;
					margin: 0 auto;
					margin-bottom: 19px;
				}
			}
		}
	}
}
</style>