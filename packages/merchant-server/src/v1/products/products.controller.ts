import { Controller, Get, Post, Query, Delete } from "@nestjs/common";

@Controller("products")
export class ProductsController {
    @Get("/")
    async getAll() {
        return null;
    }
    @Post("/")
    async register() {
        return null;
    }
    @Get("/:productId")
    async get(
        @Query("productId") productId: number
    ) {
        return null;
    }
    @Delete("/:productId")
    async unregister() {
        return null;
    }

}