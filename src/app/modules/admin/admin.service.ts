import {Injectable, Logger} from "@nestjs/common";
import {UserRepository} from "../../shared/modules/user/user.repository";

@Injectable()
export class AdminService {
    private logger: Logger = new Logger(AdminService.name)

    constructor(
        private userRepository: UserRepository
    ) {}

    async promoteUserToAdmin(id: number): Promise<void> {
        await this.userRepository.promoteUserToAdmin(id);
        this.logger.verbose('User successfully promote ');
    }

    async revokeAdminPrivileges(id: number): Promise<void> {
        await this.userRepository.revokeAdminPrivileges(id);
        this.logger.verbose('Admin privileges successfully revoked ')
    }
}