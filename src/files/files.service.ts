import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    messageUpload(originalname: string){
        return {message: `The file '${originalname}' was uploaded successfully`}
    }
}
