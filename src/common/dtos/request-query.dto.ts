import { ApiProperty } from '@nestjs/swagger';

class RequestQueryDTO {
    @ApiProperty({ type: Number, description: '123456', required: false })
    startTime: number;
    @ApiProperty({ type: Number, required: false })
    endTime: number;
    @ApiProperty({ type: 'string|string[]', required: false })
    keys: string[] = [];
    @ApiProperty({ type: Number, minimum: 1, default: 1, required: false })
    page = 1;
    @ApiProperty({ type: Number, default: 10, required: false })
    size = 10;
}
export { RequestQueryDTO };
