import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getProducts() {
    return this.productService;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProductsById(Number(id));
  }
}
