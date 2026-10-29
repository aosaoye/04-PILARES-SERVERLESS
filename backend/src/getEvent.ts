import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


export const handler = async(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const id = event.pathParameters?.id;

    console.log(`Evento recibido ${id}`)

    if(!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Error ID no proporcionado'
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            id,
            artist: 'The Weeknd',
            space: 'Main State',
            time: '22:00',
            date: '2026-12-31',
            location: 'Miami Beach',
            status:'SOLD_OUT'
        }),
    }
}