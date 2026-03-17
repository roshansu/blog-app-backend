import e from 'express'
import { newPost, deletePost, getAllPost, recentPost } from '../controller/postControl.js'
import verifyUser from '../middleware/verifyUser.js'

const postRouter = e.Router()

postRouter.get('/', getAllPost)
postRouter.post('/', verifyUser, newPost)
postRouter.delete('/:id', verifyUser, deletePost)
postRouter.get('/recent', recentPost)


export default postRouter