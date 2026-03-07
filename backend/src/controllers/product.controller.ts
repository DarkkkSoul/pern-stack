import type { Request, Response } from "express";
import * as query from '../db/queries.ts'
import { getAuth } from "@clerk/express";


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await query.getAllProducts();
        res.status(200).json(products)
    } catch (error) {
        console.log("Error getting all products:", error)
        res.status(500).json({ error: "Error getting all products" })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (typeof id !== "string" || !id) {
            res.status(400).json({ error: "Invalid product id" });
            return;
        }

        const product = await query.getProductById(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" })
            return;
        }

        res.status(200).json(product)
    } catch (error) {
        console.log("Error getting product by Id", error)
        res.status(500).json({ error: "Cannot get this product details" })
    }
}

export const getMyProducts = async (req: Request, res: Response) => {
    try {

        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return
        }
        const products = await query.getProductsByUserId(userId);

        res.status(200).json(products);

    } catch (error) {
        console.log("Error getting your products", error)
        res.status(500).json({ error: "Error getting your products" })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) res.status(401).json({ error: "Unauthorized" });


        const { name, description, imageUrl } = req.body;

        if (!name || !description || !imageUrl) {
            res.status(400).json({ error: "Name, description, and imageUrl are required" });
            return;
        }

        const product = await query.createProduct({ ownerId: userId!, name, description, imageUrl });

        res.status(200).json(product);

    } catch (error) {
        console.log("Error creating your products", error)
        res.status(500).json({ error: "Error creating your products" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        const { name, description, imageUrl } = req.body;
        const id = req.params.id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return
        }

        if (typeof id !== "string" || !id) {
            res.status(400).json({ error: "Invalid product id" });
            return;
        }

        const productExists = await query.getProductById(id);
        if (!productExists) {
            res.status(404).json({ error: "Product not found" });
            return
        }

        if (productExists.ownerId !== userId) {
            res.status(403).json({ error: "You are not the owner of this product" });
            return
        }

        const product = await query.updateProduct(id, {
            name, description, imageUrl
        })

        res.status(200).json(product);

    } catch (error) {
        console.log("Error in updating your products", error)
        res.status(500).json({ error: "Error in updating your products" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        const id = req.params.id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" })
            return;
        }

        if (typeof id !== "string" || !id) {
            res.status(400).json({ error: "Invalid product id" });
            return;
        }

        const productExists = await query.getProductById(id);

        if (!productExists) {
            res.status(404).json({ error: "product not found" })
            return;
        }

        if (productExists.ownerId !== userId) {
            res.status(403).json({ error: "You are not the owner of this product" })
        }

        const product = await query.deleteProduct(id);

        res.status(200).json(product)

    } catch (error) {
        console.log("Error deleting your product", error)
        res.status(500).json({ error: "Error deleting your product" })
    }
}