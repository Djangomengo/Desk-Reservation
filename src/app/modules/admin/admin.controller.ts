import {Controller, Param, Put} from "@nestjs/common";
import {AdminService} from "./admin.service";

@Controller('admins')
export class AdminController {
    constructor(
        private adminService: AdminService
    ) {}

    @Put('promote/:id')
    async promoteUserToAdmin(@Param('id') id: number): Promise<void> {
        await this.adminService.promoteUserToAdmin(id)
    }

    @Put('revok/:id')
    async revokeAdminPrivileges(@Param('id') id: number): Promise<void> {
        await this.adminService.revokeAdminPrivileges(id)
    }
}