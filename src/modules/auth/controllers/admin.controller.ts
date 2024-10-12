import {
    Body, Controller, Delete, Get, Headers,
    HttpException,
    HttpStatus,
    NotFoundException, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { RolesAuthGuard } from '../guards/roles.guard';
import { AuthGuard } from '../guards/auth.guard';
import { SignUpDto } from '../dto/sign-up.dto';
import { Auth } from '../entities/auth.entity';
import { UpdateUsersDto } from '../dto/update-users.dto';
import { Roles } from '../roles.decorator';
import { AdminService } from '../services/admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';

@ApiTags("Admin")
@UseGuards(AuthGuard, RolesAuthGuard)
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    private readonly authService: AuthService
    ) { }

    @Roles("admin")
    @Get()
    getAllUsers(
        @Headers('Authorization') token: string,
    ): Promise<Auth[]> {
        return this.adminService.getAllUsers(token);
    }

    @Roles("admin")
    @Put('update/:id')
    async updateUsers(
        @Body() updateUsers: UpdateUsersDto,
        @Param('id') id: number,
        @Headers('Authorization') token: string,
    ): Promise<{ message: string }> {
        try {
            return await this.adminService.updateUsers(id, updateUsers, token);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            }
            throw new Error('User error occurred while updating the admin');
        }
    }

    @Roles("admin")
    @Delete(':id')
    async deleteUser(
        @Param('id') id: number,
        @Headers('Authorization') token: string,
    ): Promise<{ message: string }> {
        try {
            await this.adminService.deleteUser(id, token);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            }
            throw new Error('An error occurred while deleting the user');
        }

        return {
            message: "User has successfuly deleted"
        }
    }
}