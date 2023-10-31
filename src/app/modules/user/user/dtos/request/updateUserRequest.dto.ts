import {PartialType} from "@nestjs/swagger";
import {CreateUserRequestDto} from "./createUserRequest.dto";

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto){
}