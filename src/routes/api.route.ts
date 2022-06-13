import { postData } from '../controllers/api.controller'
import {Router} from 'express'

const router = Router()


router.get('/', postData)


export default router


   