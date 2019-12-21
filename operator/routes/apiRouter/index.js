import Router from '@koa/router'

import {
  listProjectController,
  viewProjectController,
  createProjectController,
  editProjectController,
  deleteProjectController,
  openProjectController
} from '../../controllers/apiController/projectController'

const router = new Router()

router.get('/project/list', listProjectController)
router.get('/project/view', viewProjectController)
router.post('/project/create', createProjectController)
router.post('/project/edit', editProjectController)
router.post('/project/delete', deleteProjectController)
router.post('/project/open', openProjectController)

export default router.routes()
