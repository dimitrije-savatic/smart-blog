export interface IComment {
    body: string,
    user_id: number,
    post_id: number,
    parent_id: number | null
}
