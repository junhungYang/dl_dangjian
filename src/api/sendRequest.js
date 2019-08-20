import axios from 'axios'
import qs from 'qs'
import router from '../router'

// var url ='/api';
var url = 'http://dldqt.ydcycloud.com/dl-api/api'

function getCommunity(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/activity/getCommunity',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}
function getActivityList(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/activity/getActivityList',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getActivityDetail(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/activity/getActivityDetail',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getUserOrder(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/order/getUserOrder',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getCommunityOrder(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/order/getCommunityOrder',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function login(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/login/login',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				reject(reponse.data);
			}
		})
	})
}

function getNewListall(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/new/getNewList',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				reject(reponse.data);
			}
		})
	})
}
function getnewdetail(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/new/getNewDetail',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				reject(reponse.data);
			}
		})
	})
}

function getcommentlist(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/comment/getCommentList',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getIntegralRuleDesc(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/partyuser/getIntegralRuleDesc',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getOurCenter(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/partyuser/getOurCenter',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getOurActivity(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/partyuser/getOurActivity',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function likeComment(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/comment/likeComment',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getbanner(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/banner/getBanner',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				reject(reponse.data);
			}
		})
	})
}

function _upload(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/upload/upload',data,{headers: {'Content-Type': 'multipart/form-data','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function Req_upload(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/upload/upload',data,{headers: {'Content-Type': 'multipart/form-data','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function pushactivity(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/comment/post',data,{headers: {'Content-Type': 'application/json','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getActivityIntegral(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/partyuser/getActivityIntegral',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function signupactivity(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/activity/signUpActivity',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getOurPic(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/partyuser/getOurPic',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getmeorder(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/order/getMeOrder',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getuseractivityorder(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/order/getUserActivityOrder',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function getmeactivityorder(data){
	return new Promise((resolve,reject) => {
		axios.post(url+'/order/getMeActivityOrder',qs.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded','token': localStorage.getItem('token')}}).then(reponse => {
			if(reponse.data.code == 0){
				resolve(reponse.data);
			}
			else {
				if(reponse.data.code == 400){
					router.push({'path':'/login'})
				}else{
					reject(reponse.data);
				}
			}
		})
	})
}

function Req_feedback(data) {
	return axios.create({
		url: `${url}/feedback/post`,
		data: JSON.stringify(data),
		method: 'post',
		headers: {
			'Content-Type':'application/json',
			'token': localStorage.getItem('token')
		}
	})()
}

function Req_applyLeave(data) {
	return axios.create({
		url: `${url}/activity/applyLeave`,
		data: qs.stringify(data),
		method: 'post',
		headers: {
			'token': localStorage.getItem('token')
		}
	})()
}

function Req_getWish(data) {
	return axios.create({
		url: `${url}/activity/wishClaim`,
		data: qs.stringify(data),
		method: 'post',
		headers: {'token': localStorage.getItem('token')}
	})()
}

export{
	getCommunity,
	getActivityList,
	getActivityDetail,
	getUserOrder,
	getCommunityOrder,
	login,
	getNewListall,
	getnewdetail,
	getcommentlist,
	getIntegralRuleDesc,
	getOurCenter,
	getOurActivity,
	likeComment,
	_upload,
	pushactivity,
	getActivityIntegral,
	signupactivity,
	getOurPic,
	getmeorder,
	getbanner,
	getuseractivityorder,
	getmeactivityorder,
	Req_feedback,
	Req_upload,
	Req_getWish,
	Req_applyLeave
}