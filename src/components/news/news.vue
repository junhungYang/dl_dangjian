<template>
	<div class="news">
		<div class="nav" v-show="!detailishow"><ul>
			<li v-for="(item,index) in toplist" @click="changenews(index)"><span :class="{colrspan:index == listindex}">{{item}}</span></li>
		</ul></div>
		<div class="newsmain" v-show="!detailishow">
			<keep-alive>
			<component :is="type"></component>
		</keep-alive>
		</div>
		<div class="newsmain1" v-if="detailishow">
			<component :is="type1"></component>
		</div>
	<b-nav :options="3" v-show="!detailishow"></b-nav>
	</div>
</template>
<script>
import nav from '../bottomNav.vue'
import datenews from './datenews.vue'
import partywork from './partywork.vue'
import juzhen from './juzhen.vue'
// import interaction from './interaction.vue'
import newsdetail from './newsdetail.vue'
export default{
	data(){
		return {
			toplist:['大沥组工'],
			type:'partywork',
			type1:'newsdetail'
		}
	},
	computed:{
		listindex(){
			switch(this.$store.state.dangjiantype){
				case 0:
				this.type = 'partywork';
				break;
				case 1:
				this.type = 'datenews';
				break;
				case 2:
				this.type = 'juzhen';
				break;
			}
			return this.$store.state.dangjiantype;
		},
		detailishow(){
			return this.$store.state.shownewsdetail;
		}
	},
	methods : {
		changenews(index){
			this.$store.commit('SETDANGJIANTYPE',index);
			
		}
	},
	components: {
    'b-nav':nav,
    'datenews':datenews,
    'partywork':partywork,
    'newsdetail':newsdetail,
    'juzhen':juzhen
  }
}	
</script>
<style lang="less" scoped>
.news{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.nav{
		padding: 0 30px;
		height: 80px;
		ul{
			width: 100%;
			height: 100%;
			display: flex;
			li{
				flex:1;
				text-align: center;
				span{
					line-height: 80px;
					padding-bottom: 16px;
					font-size: 30px;
					color: #999999;
				}
				.colrspan{
					// border-bottom: 4px solid #f64e45;
					color: #333333;
				}
			}
		}
	}
	.newsmain{
		width: 100%;
		height: calc(100% - 180px);
	}
	.newsmain1{
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}
}
</style>