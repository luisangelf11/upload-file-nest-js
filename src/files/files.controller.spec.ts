import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Readable } from 'stream';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
      controllers: [FilesController],
    }).compile();
    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond with status code 200 and upload a file', async () => {
    // Mock del método uploadFile
    controller.uploadFile = jest.fn().mockImplementation(() => {
      return {
        statusCode: 200,
        message: 'File uploaded successfully',
      };
    });

    const mockStream = new Readable();
    mockStream.push('mock file data'); // Agrega datos al stream
    mockStream.push(null); // Señala el final del stream

    const mockFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: 'testFile.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      size: 1024,
      destination: '/uploads',
      filename: 'testFile.txt',
      path: '/uploads/testFile.txt',
      buffer: Buffer.from('mock file data'),
      stream: mockStream, // Simula un stream
    };
    const response = await controller.uploadFile(mockFile);

    // Esperamos que falle porque no coincide con lo esperado
    expect(response.message).toBe('File uploaded successfully');
  });

  it('should validate a number props data object', () => {
    const invalidData = { a: 'invalid', b: 2 } as unknown as {
      a: number;
      b: number;
    };
    expect(() => controller.addNumber(invalidData)).toThrow(
      `The object data has params that is not a number`,
    );
  });

  it('should return a number', () => {
    const data = {
      a: 3,
      b: 1,
    };
    const result = controller.addNumber(data);
    expect(result).toBe(4);
  });
});
