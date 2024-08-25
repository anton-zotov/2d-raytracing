type Branded<K, T> = K & { __brand: T };

export type Radians = Branded<number, "Radians">;
export type Degrees = Branded<number, "Degrees">;
