import type { Request, Response } from 'express'
import { getAuth } from '@clerk/express'
import * as query from '../db/queries.ts'

// User logs in on frontend using Clerk
// Clerk generates a JWT token
// That token is automatically attached to requests (usually in headers or cookies)
// Clerk middleware verifies that token
// getAuth(req) extracts decoded info from it

export async function SyncUserToDB(req: Request, res: Response) {
    try {

        const { userId } = getAuth(req); // req contains headers to we're sending complete req.

        if (!userId) res.status(400).json({ error: "UNAUTHORIZED ACCESS" })

        const { name, email, imageUrl } = req.body();

        if (!email || !name || !imageUrl) {
            res.status(400).json({ error: "Input fields are empty" })
        }

        const user = query.upsertUser({
            id: userId,
            name, email, imageUrl
        })

        res.status(200).json(user);

    } catch (error) {
        console.log("Error Syncing the User:", error)
        res.status(500).json({ error: "Error syncing the user" });
    }
}