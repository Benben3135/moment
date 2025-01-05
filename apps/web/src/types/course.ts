export interface Course {
    id: string
    title: string
    description: string
    price: number
    author: {
      id: string
      name: string
    }
    createdAt: Date
  }