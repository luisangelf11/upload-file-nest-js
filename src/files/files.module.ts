import { HttpCode, HttpException, HttpStatus, Module, NotFoundException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads', // Puedes ajustar el destino según sea necesario
          filename: (req, file, callback) => {
            // Genera un nombre de archivo único
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
        fileFilter: (req, file, callback) => {
          // Validación de archivo antes de subirlo
          if (!file.originalname.match(/png|PNG/)) {
            return callback( new HttpException("The file has a invalid format", HttpStatus.BAD_REQUEST), false);
          }
          callback(null, true);
        },
      })
     }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
