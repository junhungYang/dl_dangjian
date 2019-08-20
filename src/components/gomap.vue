<template>
	<div class="map">
		<div id="map-container"></div>
	</div>	
</template>
<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
export default{
	data(){
		return{

		}
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			// console.log(123);
			let mapObj = new AMap.Map('map-container', {
          center: [this.$route.query.lng,this.$route.query.lat],
          zoom: 19
        })
			mapObj.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
  mapObj.addControl(new AMap.ToolBar())
  mapObj.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))
        })
			let marker = new AMap.Marker({
				map:mapObj,
				position:[this.$route.query.lng,this.$route.query.lat]
			});
			marker.setLabel({
				offset: new AMap.Pixel(20,20),
				content:'点击打开高德地图'
			})
			let _this = this;
			marker.on('click',function(){
				// console.log(222);
				console.log(_this.$route.query);
				window.location.href = "https://uri.amap.com/marker?position="+_this.$route.query.lng+','+_this.$route.query.lat;
			})
	}
}
}	
</script>
<style lang="less" scoped>
.map{
	width: 100%;
	height: 100%;
	#map-container{
		width: 100%;
		height: 100%;
	}
}
</style>