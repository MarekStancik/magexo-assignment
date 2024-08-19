import { NavLink, useLoaderData, type MetaFunction } from "@remix-run/react";
import { type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { ProductImage } from "~/components/ProductImage";
import { ProductPrice } from "~/components/ProductPrice";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return [{ title: `MageXo | ${data?.product.title ?? ""}` }];
};

export async function loader({ context, params }: LoaderFunctionArgs) {
    const { handle } = params;
    const { storefront } = context;

    if (!handle) {
        throw new Error("Expected product handle to be defined");
    }

    const { product } = await storefront.query(PRODUCT_QUERY, {
        variables: { handle },
    });

    if (!product?.id) {
        throw new Response(null, { status: 404 });
    }

    return { product };
}

export default function Product() {
    const { product } = useLoaderData<typeof loader>();

    return (
        <div className="w-full flex flex-col">
            <div className="flex gap-2 items-center">
                <NavLink to="/collections">
                    <h1>Products</h1>
                </NavLink>
                <div className="flex gap-2 items-center max-md:hidden">
                    <span className="text-2xl">/</span>
                    <h1 className="truncate">{product.title}</h1>
                </div>
            </div>
            <div className="products-grid">
                <ProductImage image={product.featuredImage} shadow={true} />
                <div className="flex flex-col gap-4">
                    <h1 style={{ margin: "unset" }}>{product.title}</h1>
                    <ProductPrice
                        price={product.priceRange.minVariantPrice}
                        compareAtPrice={product.compareAtPriceRange.minVariantPrice}
                    />
                    <article className="flex flex-col gap-2">
                        <strong>Description</strong>
                        {product.descriptionHtml ? <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /> : <span>{product.description || "No Description Available"}</span>}
                    </article>
                </div>
            </div>
        </div>
    );
}

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    handle
    descriptionHtml
    description
    featuredImage {
      url
      id
      altText
      height
      width
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
