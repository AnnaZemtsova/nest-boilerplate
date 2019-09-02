import {ApiModelProperty} from "@nestjs/swagger";

export class UserDto {

    @ApiModelProperty({ type: 'string', required: false })
    readonly name?: string;

    @ApiModelProperty({ type: 'string', required: true })
    readonly email: string;

    @ApiModelProperty({ type: 'string', required: true })
    readonly password: string;
}
