import {Expose} from "class-transformer";

export class UserListResponseDto {
    @Expose()
    users: {
        id: number
        username: string
    }[]
}