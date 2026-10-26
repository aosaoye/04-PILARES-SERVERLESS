"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            message: 'Festival Control. Equipo preparado',
            path: event.path,
            httpMethod: event.httpMethod,
        }),
    };
};
exports.handler = handler;
//# sourceMappingURL=hello.js.map