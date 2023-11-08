export type ItemInArray<A> = A extends Array<infer Item> ? Item : never
