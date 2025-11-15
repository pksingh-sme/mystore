import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticPage } from '../../entities/static-page.entity';

@Injectable()
export class StaticPagesService {
  constructor(
    @InjectRepository(StaticPage)
    private staticPagesRepository: Repository<StaticPage>,
  ) {}

  async findBySlug(slug: string): Promise<StaticPage | null> {
    return await this.staticPagesRepository.findOne({ where: { slug } });
  }

  async findAll(): Promise<StaticPage[]> {
    return await this.staticPagesRepository.find();
  }

  async create(createStaticPageDto: Partial<StaticPage>): Promise<StaticPage> {
    const staticPage = this.staticPagesRepository.create(createStaticPageDto);
    return await this.staticPagesRepository.save(staticPage);
  }

  async update(
    slug: string,
    updateStaticPageDto: Partial<StaticPage>,
  ): Promise<StaticPage | null> {
    await this.staticPagesRepository.update({ slug }, updateStaticPageDto);
    return await this.staticPagesRepository.findOne({ where: { slug } });
  }

  async remove(slug: string): Promise<void> {
    await this.staticPagesRepository.delete({ slug });
  }
}
