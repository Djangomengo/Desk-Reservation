import {PartialType} from "@nestjs/swagger";
import {UserRequestDto} from "src/app/modules/user/dtos/request/user-request.dto";

export class UpdateUserRequestDto extends PartialType(UserRequestDto){
}