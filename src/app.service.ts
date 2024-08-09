import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UploadedFileDto } from "./dto/file-dto";
import { extname } from "path";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getHello() {
    return await this.prisma.file.findMany();
  }
  async uploadFile(file: UploadedFileDto) {
    const extension = extname(file.originalname); // Get the file extension
    const currentDate = new Date().getTime();
    const newFile = await this.prisma.file.create({
      data: {
        name: `${currentDate.toString()}${extension}`,
        type: file.mimetype,
        content: file.buffer,
      },
    });
    const fileUrl = `${process.env.BASE_URL}${newFile.name}`;
    return { fileId: newFile.id, fileUrl };
  }

  async findByName(name: string) {
    const file = await this.prisma.file.findUnique({
      where: {
        name,
      },
    });
    return file;
  }
}
