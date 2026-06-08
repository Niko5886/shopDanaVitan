import type { SchemaTypeDefinition } from "sanity";

import { product } from "./product";

// Регистър на всички схеми, които Studio познава.
export const schemaTypes: SchemaTypeDefinition[] = [product];
