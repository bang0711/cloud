import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFileDto } from "./dto/file-dto";
import type { Response } from "express";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: UploadedFileDto) {
    return this.appService.uploadFile(file);
  }
  @Get(":name")
  async findByName(
    @Param("name") name: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.appService.findByName(name);
    if (!file) {
      return { message: "File not found", statusCode: 404 };
    }
    res.set({
      "Content-Type": file.type,
      "Content-Disposition": `inline; filename="${file.name}"`,
    });
    return new StreamableFile(file.content);
  }
}
