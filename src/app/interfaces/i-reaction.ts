export interface IReaction {
    user_id: number,
    reactable_id: number | null,
    reactable_type: string,
    type: string
}
