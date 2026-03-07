import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import * as query from '../db/queries.ts'

export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { productId } = req.params;
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: "Comment content is required" });
        if (!productId || typeof productId !== 'string') return res.status(400).json({ error: "Valid product ID is required" });

        const product = await query.getProductById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const comment = await query.createComment({
            content,
            userId,
            productId,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { commentId } = req.params;

        if (!commentId || typeof commentId !== 'string') return res.status(400).json({ error: "Valid comment ID is required" });

        const existingComment = await query.getCommentById(commentId);
        if (!existingComment) return res.status(404).json({ error: "Comment not found" });

        if (existingComment.userId !== userId) {
            return res.status(403).json({ error: "You can only delete your own comments" });
        }

        await query.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
};