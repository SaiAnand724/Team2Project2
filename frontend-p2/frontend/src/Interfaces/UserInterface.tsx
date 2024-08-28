import { UUID } from "crypto";

// Player and Team Manager Model
export interface UserInterface {
    userId?: UUID,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    jwt?: string
}