export default interface IProfessor {
  name: string
  rating: {
    liked: number
    clear: number
    engaging: number
    filled_count: number
    comment_count: number
  }
}
