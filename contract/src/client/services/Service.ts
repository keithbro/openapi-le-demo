/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class Service {

    /**
     * @param id
     * @param hello
     * @param world
     * @param payload
     * @param cookie Cookie
     * @returns any 201 response
     * @throws ApiError
     */
    public static async updateSomething(
        id: number,
        hello: string,
        world: string,
        payload: {
            action: 'create' | 'update' | 'delete',
        },
        cookie: string = 'access_token={{token}}',
    ): Promise<{
        id: number,
    }> {
        const result = await __request({
            method: 'PUT',
            path: `/api/something/${id}`,
            headers: {
                'Cookie': cookie,
            },
            query: {
                'hello': hello,
                'world': world,
            },
            body: payload,
            errors: {
                400: `400 response`,
            },
        });
        return result.body;
    }

}