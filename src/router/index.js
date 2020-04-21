/**
 * Auto collect router
 */
import Vue from 'vue'
import Router from 'vue-router'

let routers = require.context('@/views', true, /\.vue$/i).keys() // 一级文件路径
const indexRouterMap = {} // 基础routers

routers.forEach(item => {
  const paths = item.match(/[a-zA-Z]+/g)
  // let routerChild
  const setChildren = (item, paths) => {
    if (paths[1] === 'children') {
      indexRouterMap[paths[0]].children.push({// 定义路由对象
        path: `/${paths[2]}`,
        name: `${paths[2]}`,
        component (resolve) {
          require([`@/views${item.slice(1)}`], resolve)
        },
        children: []
      })
    }
  }

  if (indexRouterMap.hasOwnProperty(paths[0])) {
    setChildren(item, paths)
  } else {
    indexRouterMap[paths[0]] = {// 定义路由对象
      path: `/${paths[0]}`,
      name: `${paths[0]}`,
      component (resolve) {
        require([`@/views${item.slice(1)}`], resolve)
      },
      children: []
    }

    setChildren(item, paths)
  }
})

Vue.use(Router)
const routes = []
for (let key in indexRouterMap) {
  routes.push(indexRouterMap[key])
}
export default new Router({
  routes
})
