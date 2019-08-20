import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
         state: {
           IsLogin : false,
           token:'',
           dangjiantype:0,
           shownewsdetail:false,
           detailid:''
         },
         mutations: {
          SETTOKEN(state,data){
          	state.token = token;
          },
          SETDANGJIANTYPE(state,data){
          	state.dangjiantype = data;
          },
          SETSHOWNEWSDETAIL(state,data){
          	state.shownewsdetail = data;
          },
          SETDETAILID(state,data){
          	state.detailid = data;
          }
         },
         actions: {
         	settoken(context,value){
         		context.commit('SETTOKEN',value);
         	},
         	setdetailid(context,value){
         		context.commit('SETDETAILID',value);
         	}
         }
       });