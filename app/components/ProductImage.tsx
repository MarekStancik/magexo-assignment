
import { Image } from "@shopify/hydrogen";
import { Product } from "@shopify/hydrogen/storefront-api-types";
import noImage from "~/assets/no-image-available.png"

export function ProductImage({ image, shadow }: { image: Partial<Product["featuredImage"]> | undefined; shadow?: boolean }) {
    if (!image) {
        return <div className={"flex items-center justify-center" + (shadow ? " shadow" : "")}>
            <img src={noImage} width="280px" height="280px" />
        </div>;
    }

    return (
        <div className={shadow ? " shadow" : ""}>
            <Image
                alt={image.altText || "Product Image"}
                aspectRatio="1/1"
                data={image}
                key={image.id}
                sizes="(min-width: 45em) 50vw, 100vw"
            />
        </div>
    );
}
