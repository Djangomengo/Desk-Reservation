import {Expose} from "class-transformer";

export class AuthResponseDto {
    @Expose()
    username?: string;

    @Expose()
    readonly message?: string;

}