import { getPhoneNumber, postData } from '../controllers/api.controller'
import {Router} from 'express'
import { validatePhoneNumber } from '../middlewares/validatePhoneNumber'

const router = Router()


router.get('/', validatePhoneNumber, postData)
router.get('/:number', getPhoneNumber)



export default router


   