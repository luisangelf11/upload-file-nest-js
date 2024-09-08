import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('upload')
export class FilesController {
  constructor(private fileServices: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
 async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileServices.messageUpload(file.originalname);
  }

  @Get()
  addNumber(@Body() data: {a: number, b: number}){
    if(typeof data.a !== 'number' || typeof data.b !== 'number') throw new Error(`The object data has params that is not a number`)
    return data.a + data.b
  }
}
