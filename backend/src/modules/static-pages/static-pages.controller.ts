import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaticPagesService } from './static-pages.service';
import { StaticPage } from '../../entities/static-page.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('static-pages')
export class StaticPagesController {
  constructor(private readonly staticPagesService: StaticPagesService) {}

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return await this.staticPagesService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.staticPagesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createStaticPageDto: Partial<StaticPage>) {
    return await this.staticPagesService.create(createStaticPageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateStaticPageDto: Partial<StaticPage>,
  ) {
    return await this.staticPagesService.update(slug, updateStaticPageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return await this.staticPagesService.remove(slug);
  }
}