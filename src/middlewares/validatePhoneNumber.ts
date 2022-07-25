
import { NextFunction, Request, Response } from 'express'
import fetch from 'node-fetch'

export const validatePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {

    const token: string = process.env.API_TOKEN || ''

    const { numero, nombre } = req.query
    const complete_phone_number = `+521${numero}`



    try {
        const response = await fetch(`https://app.okeybot.com/api/v1/contact/${complete_phone_number}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()

        //crear contacto 
        if (data?.status == 'error') {
            const payload =
            {
                custom_fields: [
                    {
                        name: 'phone',
                        value: complete_phone_number
                    },
                    {
                        name: 'firstName',
                        value: nombre
                    }
                ]
            }

            const postContact = await fetch(`https://app.okeybot.com/api/v1/contact/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const postContactResponse = await postContact.json()
            console.log('El usuario no existía, procedió a crearse', postContactResponse)
        }

        next()

    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' })
    }

}