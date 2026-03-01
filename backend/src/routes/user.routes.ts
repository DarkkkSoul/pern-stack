import { Router } from "express";
import { SyncUserToDB } from "../controllers/user.controller.ts";

import { requireAuth } from "@clerk/express";

const router = Router();

router.post('/sync', requireAuth(), SyncUserToDB)

export default router;