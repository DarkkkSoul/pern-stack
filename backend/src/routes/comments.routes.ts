import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { createComment, deleteComment } from "../controllers/comment.controller.ts";

const router = Router();

router.post("/:productId", requireAuth(), createComment);

router.delete("/:commentId", requireAuth(), deleteComment);

export default router;