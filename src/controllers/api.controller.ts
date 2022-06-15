import {json, Request, Response} from 'express'
import { getPayload } from '../helpers/getTemplatePayload'
import fetch from 'node-fetch'

const BASE_API_URL : string = process.env.API_URL || ''

export const postData = async (req: Request, res: Response) => {
    
    const token: string = process.env.API_TOKEN || ''
    
    if (req.query.template == ' suspencion') {
        req.query.template = 'suspencion'
    }

    const { numero, nombre, template, cantidad, user, pass, fecha } = req.query
    const complete_phone_number = `521${numero}`
    const queries = {
        complete_phone_number,
        nombre,
        template,
        cantidad,
        user,
        pass,
        fecha
    }
    const payload = getPayload(queries)
    


    const response = await fetch(`${BASE_API_URL}/v1/message/sendContent/${complete_phone_number}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    data?.status != 'success' && res.status(400).json({ ok: false, data }) 
      res.status(200).json({ ok: true, data })
   
}



