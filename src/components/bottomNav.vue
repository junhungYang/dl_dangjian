<template>
	<div class="bottomnav">
		<ul>
			<li v-for="(item,index) in navlist" @click="goother(index)"><span>
				<img :src="item.url"></span><p :class="{colorp:options == index}">{{item.text}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: "bottomnav",
  props: {
    options: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      navlist: [
				    {
          url:
            this.options == 0
              ? "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_nav_6.png"
              : "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/index_icon_5.png",
          text: "党员服务"
        },
        {
          url:
            this.options == 1
              ? "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/organize_active.png"
              : "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/organize_icon.png",
          text: "组织生活"
        },
        {
          url:
            this.options == 2
              ? "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/warm_active.png"
              : "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/warm_icon.png",
          text: "暖心工程"
        },
        {
          url:
            this.options == 3
              ? "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/produce_active.png"
              : "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/produce_icon.png",
          text: "大沥党建"
        },
        {
          url:
            this.options == 4
              ? "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/me_active.png"
              : "https://yunduanchuangyi.oss-cn-shenzhen.aliyuncs.com/dldangjian/me_icon.png",
          text: "我的"
        }
      ]
    };
  },
  mounted() {
    console.log(this.options);
  },
  methods: {
    goother(index) {
      console.log(this.options);
      // console.log(index);
      if (this.options != index) {
        switch (index) {
          case 0:
            this.$router.push({ path: "/wishingwall" });
            break;
          case 1:
            this.$router.push({ path: "/meetingList" });
            break;
          case 2:
            this.$router.push({ path: "/" });
            break;
          case 3:
            this.$router.push({ path: "/news" });
            break;
          case 4:
            this.$router.push({ path: "/user" });
            break;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bottomnav {
  width: 100%;
  height: 100px;
  top: calc(100% - 100px);
  background-color: white;
  border-top: 1px solid rgba(238, 238, 238, 1);
  ul {
    display: flex;
    li {
      list-style: none;
      width: 20%;
      height: 100%;
      text-align: center;
      span {
        display: block;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 5px;
        height: 42px;
        img {
          height: 42px;
        }
      }
      p {
        font-size: 18px;
        color: #999999;
      }
      .colorp {
        color: black;
      }
    }
  }
}
</style>