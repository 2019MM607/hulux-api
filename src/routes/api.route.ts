import { postData } from '../controllers/api.controller'
import {Router} from 'express'
import { validatePhoneNumber } from '../middlewares/validatePhoneNumber'

const router = Router()


router.get('/', validatePhoneNumber, postData)

//hola prueba
export default router


   