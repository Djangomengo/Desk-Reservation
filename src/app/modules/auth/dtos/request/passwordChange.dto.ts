import {ApiProperty} from "@nestjs/swagger";

export class PasswordChangeRequestDto {

    @ApiProperty()
    newPassword: string;

    @ApiProperty()
    newPasswordConfirmation: string;
}