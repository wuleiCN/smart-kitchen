import router from "./routers"
import NProgress from "nprogress"

NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    console.log(to);
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
