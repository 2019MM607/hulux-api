
export interface IQueries {
    numero?: string,
    nombre?: string,
    template?: string
    cantidad?: string
    user?: string
    pass?: string
    fecha?: string

}

export const getPayload = (data) => {

    const cantidad_pesos = `${data.cantidad}`


    let payload = {}

    if (data.template === 'noti_fact') {
        payload = {
            body: [{
                type: 'whatsapp_template',
                template: {
                    name: data.template,
                    languageCode: 'es_MX',
                    components: [
                        {
                            type: 'body',
                            text: `Estimado {{1}}, le recordamos que tiene un saldo pendiente por pagar por un total de {{2}} pesos
                                evite suspensión de su servicio pagando antes del {{3}}.`,
                            parameters: [
                                {
                                    type: 'text',
                                    text: data.nombre
                                },
                                {
                                    type: 'text',
                                    text: cantidad_pesos
                                },
                                {
                                    type: 'text',
                                    text: data.fecha
                                },

                            ]
                        }
                    ]
                }
            }]
        }

    } else if (data.template === 'bienvenida') {

        payload = {
            body: [
                {
                    type: 'whatsapp_template',
                    template: {
                        name: data.template,
                        languageCode: 'es_MX',
                        components: [
                            {
                                type: 'body',
                                text: `Se ha enviado un mensaje de Bienvenida a ${data.nombre} {{1}} {{2}}`,
                                parameters: [
                                    {
                                        type: 'text',
                                        text: data.user
                                    },
                                    {
                                        type: 'text',
                                        text: data.pass
                                    }

                                ]
                            }
                        ]
                    }
                }
            ]

        }

    } else if (data.template === 'noti_pago') {

        payload = {
            body: [
                {

                    type: 'whatsapp_template',
                    template: {
                        name: data.template,
                        languageCode: 'es_MX',
                        components: [
                            {
                                type: 'body',
                                text: `Estimado usuario, hemos enviado una notificación de pago a {{1}} {{2}} pesos`,
                                parameters: [
                                    {
                                        type: 'text',
                                        text: data.nombre
                                    },
                                    {
                                        type: 'text',
                                        text: cantidad_pesos
                                    }

                                ]
                            }
                        ]
                    }
                }
            ]
        }



    } else if (data.template === 'suspencion') {

        payload = {
            body: [
                {

                    type: 'whatsapp_template',
                    template: {
                        name: data.template,
                        languageCode: 'es_MX',
                        components: [
                            {
                                type: 'body',
                                text: `Estimado usuario, se ha enviado una notificación de suspensión a {{1}}, ya que debe la cantidad de {{2}}`,
                                parameters: [
                                    {
                                        type: 'text',
                                        text: data.nombre
                                    },
                                    {
                                        type: 'text',
                                        text: cantidad_pesos
                                    }

                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }

    return payload
}

