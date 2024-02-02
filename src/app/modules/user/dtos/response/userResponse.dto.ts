import {Expose} from "class-transformer";

export class UserResponseDto {

    @Expose()
    readonly message?: string;

    @Expose()
    username?: string;

    @Expose()
    id?: string;

    @Expose()
    data?: any
}