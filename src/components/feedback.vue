<template>
  <div class="feedback">
    <div class="detail">
      <p class="title">
        <span>问题和意见</span>
        <span><i>{{this.textLen}}</i>/200</span>
      </p>
      <textarea v-model="text" cols="30" rows="10" maxlength="200"></textarea>
    </div>
    <div class="img-list">
      <p class="title">
        <span>图片(选填，提供问题截图)</span>
        <span>{{this.imgListLen}}/4</span>
      </p>
      <ul>
        <div class="img-wrap" v-for="(item,index) in imgList" :key="index">
          <img :src="item" alt="">
          <img src="@/assets/img/close.png" alt="" @click="delImg(index)">
        </div>
        <div class="upload-btn" v-show="this.imgList.length < 4">
          <img src="@/assets/img/addimg.png" alt="">
          <input ref="file" type="file" @change="() => {
            toUpload()
          }">
        </div>
      </ul>
    </div>
    <div class="phone">
      <p class="title">联系电话</p>
      <input v-model="phone" type="text" placeholder="选填、便于我们与你联系">
    </div>
    <div class="submit" @click="submit">
      提交
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Req_upload, Req_feedback } from "../api/sendrequest.js";
export default {
  data() {
    return {
      imgList: [],
      fileList: [],
      text: "",
      phone: "",
      flag: true
    };
  },
  computed: {
    textLen() {
      return this.text.length;
    },
    imgListLen() {
      return this.imgList.length;
    }
  },
  methods: {
    delImg(index) {
      this.imgList.splice(index, 1);
    },
    toUpload() {
      if (this.imgList.length < 5) {
        this.fileList.push(this.$refs.file.files[0]);
        let reader = new FileReader();
        reader.onload = e => {
          this.imgList.push(e.target.result);
        };
        reader.readAsDataURL(this.$refs.file.files[0]);
      }
    },
    submit() {
        if (!this.text) {
          alert("请输入问题和意见");
          return;
        }
      if (this.flag) {
            this.flag = false
        let arr = [];
        this.fileList.forEach(item => {
          let formData = new FormData();
          formData.append("file", item);
          arr.push(Req_upload(formData));
        });
        Promise.all(arr)
          .then(res => {
            let imgUrlList = [];
            res.forEach(item => {
              imgUrlList.push(item.msg);
            });
            return Req_feedback({
              opinion: this.text,
              imageUrlList: imgUrlList,
              mobile: this.phone
            });
          })
          .then(res => {
            if (res.data.code === 0) {
              alert("提交成功");
              this.$router.push("/");
            } else {
              alert("提交失败");
            }
            this.flag = true
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.feedback {
  min-height: 100vh;
  background: #f7f7f7;
  .title {
    height: 78px;
    font-size: 26px;
    line-height: 78px;
    padding: 0 30px;
    color: #353535;
    display: flex;
    span:first-of-type {
      flex: 1;
    }
    span:last-of-type {
      color: #666;
      font-size: 24px;
      i {
        color: #f64e45;
        font-weight: bold;
        font-style: normal;
      }
    }
  }
  .detail {
    textarea {
      width: 100%;
      height: 162px;
      font-size: 14px;
      border: 0;
      padding: 20px 30px;
      box-sizing: border-box;
      background: #fff;
      outline: none;
    }
  }
  .img-list {
    ul {
      padding: 20px 30px;
      box-sizing: border-box;
      font-size: 0;
      background: #fff;
      white-space: nowrap;
      .img-wrap {
        width: 120px;
        height: 120px;
        margin-right: 40px;
        position: relative;
        display: inline-block;
        img:first-of-type {
          width: 100%;
          height: 100%;
        }
        img:last-of-type {
          position: absolute;
          width: 30px;
          right: 7px;
          top: 7px;
        }
      }
      .upload-btn {
        position: relative;
        display: inline-block;
        width: 120px;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
        }
        input {
          margin: 0;
          padding: 0;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
  .phone {
    input {
      background: #fff;
      display: block;
      width: 100%;
      height: 50px;
      font-size: 24px;
      border: 0;
      padding: 20px 30px;
      box-sizing: border-box;
      font-size: 24px;
      outline: none;
    }
  }
  .submit {
    font-size: 30px;
    text-align: center;
    margin-top: 98px;
    margin-left: 30px;
    margin-right: 30px;
    background: #f64e45;
    border-radius: 10px;
    line-height: 80px;
    color: #fff;
    font-weight: bold;
  }
}
</style>

