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

@ApiTags("Super-admin")
@UseGuards(AuthGuard, RolesAuthGuard)
@Controller('super-admin')
export class SuperAdminController {
    constructor(
        private readonly superAdminService: AdminService,
    private readonly authService: AuthService
    ) { }

    @Roles("super-admin")
    @Post()
    async createAdmin(
        @Body() createAdmin: SignUpDto,
    ): Promise<{ message: string }> {

        const existMail: Auth | null = await this.authService.existMail(
            createAdmin.email,
          );
      
          if (existMail) {
            throw new HttpException(
              `The ${existMail.email} has already exist!`,
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }
          
        return this.superAdminService.createAdmin(createAdmin);
    }

    @Roles("super-admin")
    @Get()
    getAllUsers(
        @Headers('Authorization') token: string,
    ): Promise<Auth[]> {
        return this.superAdminService.getAllUsers(token);
    }

    @Roles("super-admin")
    @Put('update/:id')
    async updateUsers(
        @Body() updateUsers: UpdateUsersDto,
        @Param('id') id: number,
        @Headers('Authorization') token: string,
    ): Promise<{ message: string }> {
        try {
            return await this.superAdminService.updateUsers(id, updateUsers, token);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            }
            throw new Error('User error occurred while updating the admin');
        }
    }

    @Roles("super-admin")
    @Delete(':id')
    async deleteUser(
        @Param('id') id: number,
        @Headers('Authorization') token: string,
    ): Promise<{ message: string }> {
        try {
            await this.superAdminService.deleteUser(id, token);
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