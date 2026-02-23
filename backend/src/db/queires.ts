import { eq } from "drizzle-orm";
import { db } from "./index.ts";
import { users, type NewUser } from "./schema.ts";

export const createUser = async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning()
    return user;
}

export const getUserById = async (id: string) => {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user;
}

export const updateUser = async (id: string, data: Partial<NewUser>) => {

    const isExists = await getUserById(id);

    if (!isExists) {
        throw new Error("User not found");
    }

    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning()
    return user;
}

export const upsertUser = async (data: NewUser) => {
    const doesExists = await getUserById(data.id);

    if (!doesExists) {
        return createUser(data)
    }

    return updateUser(data.id, data);
}