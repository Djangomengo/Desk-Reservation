import {Expose} from "class-transformer";

export class DeskResponseDto {
    @Expose()
    id?: number;

    @Expose()
    taken?: boolean;

    @Expose()
    message?: string;
}