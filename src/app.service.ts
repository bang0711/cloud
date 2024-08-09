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

    const newFile = await this.prisma.file.create({
      data: {
        name: file.originalname,
        type: file.mimetype,
        content: file.buffer,
      },
    });

    console.log(extension);

    const fileUrl = `${process.env.BASE_URL}${newFile.id}${extension}`;
    return { fileUrl };
  }

  async findById(id: string) {
    console.log(id);
    const file = await this.prisma.file.findUnique({
      where: {
        id,
      },
    });
    return file;
  }
}
