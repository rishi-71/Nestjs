/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private products = [
        { id : 1 , name: "Mobile", price:20000},
        { id : 2 , name: "tablet", price:40000},
        { id : 3 , name: "laptop", price:80000},
    ];

    getProducts(){
        return this.products;
    }

    getProductsById(id : number){
        return this.products.find((product)=> product.id === id)
    }
}
