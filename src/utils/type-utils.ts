export type ItemOfArray<A> = A extends Array<infer Item> ? Item : never
