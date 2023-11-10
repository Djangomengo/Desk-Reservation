import {PartialType} from "@nestjs/swagger";
import {CreateUserRequestDto} from "src/app/modules/user/dtos/request/createUserRequest.dto";

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto){
}