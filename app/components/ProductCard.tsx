import { Link } from "@remix-run/react";
import { Money } from "@shopify/hydrogen";
import { ProductItemFragment } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: ProductItemFragment }) {
    const variant = product.variants.nodes[0];
    const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
    return (
        <Link
            className="flex flex-col gap-2 items-center shadow hover:shadow-2xl transition-shadow p-4 bg-gradient-to-b from-slate-100 to-zinc-100 product-card"
            key={product.id}
            prefetch="intent"
            to={variantUrl}
        >
            <ProductImage image={product.featuredImage} />
            <h4>{product.title}</h4>
            <small>
                <Money data={product.priceRange.minVariantPrice} />
            </small>
        </Link>
    );
}