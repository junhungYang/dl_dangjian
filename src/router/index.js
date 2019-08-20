import Vue from 'vue'
import Router from 'vue-router'
const  index = r => require.ensure( [], () => r (require('@/components/index')))
const  rank = r => require.ensure( [], () => r (require('@/components/ranklist')))
const  wishingwall = r => require.ensure( [], () => r (require('@/components/wishingwall')))
const  wishingdetail = r => require.ensure( [], () => r (require('@/components/wishingdetail')))
const  user = r => require.ensure( [], () => r (require('@/components/user')))
const  score = r => require.ensure( [], () => r (require('@/components/scoredetail')))
const  activities = r => require.ensure( [], () => r (require('@/components/activities')))
const  login = r => require.ensure( [], () => r (require('@/components/login')))
const  news = r => require.ensure( [], () => r (require('@/components/news/news')))
const  uploader = r => require.ensure( [], () => r (require('@/components/news/uploader.vue')))
const  newsdetail = r => require.ensure( [], () => r (require('@/components/news/newsdetail.vue')))
const  meeting = r => require.ensure( [], () => r (require('@/components/meeting')))
const  meetinglist = r => require.ensure( [], () => r (require('@/components/meetinglist')))
const  mypic = r => require.ensure( [], () => r (require('@/components/mypic')))
const  scorerule = r => require.ensure( [], () => r (require('@/components/scorerule')))
const  map = r => require.ensure( [], () => r (require('@/components/gomap')))
const  interaction = r => require.ensure( [], () => r (require('@/components/news/interaction.vue')))
const feedback = r => require.ensure([], () => r (require('@/components/feedback')))
const littleWish = r => require.ensure([], () => r(require('@/components/littleWish')))
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/littleWish',
      name: 'littleWish',
      component: littleWish
    },{
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },{
    	path: '/rank',
    	name: 'rank',
    	component: rank
    },{
    	path: '/wishingwall',
    	name: 'wishingwall',
    	component: wishingwall 
    },{
      path: '/wishingdetail',
      name: 'wishingdetail',
      component: wishingdetail
    },{
      path: '/user',
      name: 'user',
      component: user
    },{
      path: '/score',
      name: 'score',
      component: score
    },{
      path: '/activities',
      name: 'activities',
      component: activities
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/news',
      name: 'news',
      component: news
    },{
      path: '/uploader',
      name: 'uploader',
      component: uploader
    },{
      path: '/newsdetail',
      name: 'newsdetail',
      component: newsdetail
    },{
      path: '/meeting',
      name: 'meeting',
      component: meeting
    },{
      path: '/meetinglist',
      name: 'meetinglist',
      component: meetinglist
    },{
      path: '/mypic',
      name: 'mypic',
      component: mypic
    },{
      path: '/scorerule',
      name: 'scorerule',
      component: scorerule
    },{
      path: '/map',
      name: 'map',
      component: map
    },{
      path: '/interaction',
      name: 'interaction',
      component: interaction
    }
  ]
})

// 全局守卫
router.beforeEach( (to,from,next) => {
  // to 目地地   from 来自哪里 next 决定是否跳转  
  // next(false) 不跳转  next() 跳转至to的那一页， next({path:'/xxxx'}) 等同于重定向 
  if(to.path !== '/login' && !localStorage.getItem('token')) {
    next('/login')
  }else {
    next()
  }
})

export default router