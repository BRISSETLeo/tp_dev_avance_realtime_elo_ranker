import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {

    @Get()
    getAvailableRoutes() {
        return `
            <ul>
                <li><a href="/api/player" target="_blank">GET /api/player</a></li>
                <li><a href="/api/match" target="_blank">GET /api/match</a></li>
            </ul>
        `;
    }

}
