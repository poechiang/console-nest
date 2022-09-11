import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * Demo
     * @returns query
     */
    @ApiTags('APP')
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
