import { ICategory } from "./i-category";

export interface IPost {
    id: number,
    title: string,
    body: string,
    user_id: number,
    created_at: Date,
    updated_at: Date,
    categories: ICategory[]
}
