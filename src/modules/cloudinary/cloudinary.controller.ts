import {
    Controller,
    Delete,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { multerOptions } from './options';
import { CloudinaryService } from './cloudinary.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Image")
@UseGuards(AuthGuard)
@Controller('image')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    uploadImage(
        @UploadedFile()
        file: Express.Multer.File
    ) {
        return this.cloudinaryService.uploadFile(file);
    }

    @Delete(':publicId')
    async deleteImage(@Param('publicId') publicId: string): Promise<any> {
        const result = await this.cloudinaryService.deleteImage(publicId);
        return {
            message: 'Image deleted successfully',
            result,
        };
    }
}