import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
      controllers: [FilesController]
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
