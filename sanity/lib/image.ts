import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

// Builder за URL-и на изображения, качени в Sanity.
const builder = createImageUrlBuilder({ projectId, dataset });

// Хелпър urlFor — приема Sanity image source и връща builder,
// върху който се вика .width().height().url() и т.н.
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
