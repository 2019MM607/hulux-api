import {json, Request, Response} from 'express'
import { getPayload } from '../helpers/getTemplatePayload'
import fetch from 'node-fetch'

const BASE_API_URL : string = process.env.API_URL || ''

export const postData = async (req: Request, res: Response) => {
    
    const token: string = process.env.API_TOKEN || ''
    const { numero, nombre, template, cantidad, user, pass, fecha } = req.query

    const queries = {
        numero,
        nombre,
        template,
        cantidad,
        user,
        pass,
        fecha
    }
    const payload = getPayload(queries)
    


    const response = await fetch(`${BASE_API_URL}/v1/message/sendContent/${numero}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    res.status(200).json({ ok: true, data })


}


