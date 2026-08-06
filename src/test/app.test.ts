import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { createServer, Server } from 'node:http';

describe('app cors middleware', () => {
    let server: Server;
    let port: number;

    beforeAll(async () => {
        process.env.FRONTEND_URL = '';
        const { default: app } = await import('../../src/app.js');

        server = createServer(app);
        await new Promise<void>((resolve) => {
            server.listen(0, '127.0.0.1', () => resolve());
        });

        const address = server.address();
        if (address && typeof address !== 'string') {
            port = address.port;
        }
    });

    afterAll(async () => {
        if (server) {
            await new Promise<void>((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            });
        }
    });

    it('allows browser requests from a local frontend origin when no whitelist is configured', async () => {
        const response = await fetch(`http://127.0.0.1:${port}/api/v1/users/my-profile`, {
            method: 'OPTIONS',
            headers: {
                Origin: 'http://localhost:5173',
                'Access-Control-Request-Method': 'GET',
            },
        });

        expect(response.status).toBe(200);
        expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
    });

    it('allows a frontend origin when the configured whitelist includes a trailing slash', async () => {
        process.env.FRONTEND_URL = 'http://localhost:5173/';

        const { default: app } = await import('../../src/app.js');
        const serverWithTrailingSlash = createServer(app);

        await new Promise<void>((resolve) => {
            serverWithTrailingSlash.listen(0, '127.0.0.1', () => resolve());
        });

        const address = serverWithTrailingSlash.address();
        const portWithTrailingSlash = address && typeof address !== 'string' ? address.port : port;

        const response = await fetch(`http://127.0.0.1:${portWithTrailingSlash}/api/v1/users/my-profile`, {
            method: 'OPTIONS',
            headers: {
                Origin: 'http://localhost:5173',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'authorization,content-type',
            },
        });

        expect(response.status).toBe(200);
        expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');

        await new Promise<void>((resolve, reject) => {
            serverWithTrailingSlash.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    });
});
