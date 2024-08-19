import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { MetaFunction } from "@shopify/remix-oxygen";
import { CollectionFragment } from "storefrontapi.generated";
import { ProductCard } from "~/components/ProductCard";
import { PRODUCT_ITEM_FRAGMENT } from "~/graphql/product.fragment";

export const meta: MetaFunction<typeof loader> = () => {
    return [{ title: "MageXo | Collections" }];
};

export async function loader({ context }: LoaderFunctionArgs) {
    return await context.storefront.query(COLLECTIONS_QUERY, {});
}

export default function CollectionsPage() {
    const { collections } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col w-full">
            <h1>Collections</h1>
            {collections.nodes.map((collection) => {
                return <CollectionItem
                    key={collection.id}
                    collection={collection}
                />
            })}
        </div>
    );
}

function CollectionItem({ collection }: { collection: CollectionFragment }) {
    return (
        <section key={collection.id} className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h2>{collection.title}</h2>
                <Link
                    className="text-xl"
                    to={`/collections/${collection.handle}`}
                    prefetch="intent"
                >
                    <span>More →</span>
                </Link>
            </div>
            <div className="products-grid">
                {collection.products.nodes.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </section>
    );
}

const COLLECTIONS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  fragment Collection on Collection {
    id
    title
    handle
    products(first: 3) {
      nodes {
        ...ProductItem
      }
    }
  }
  query StoreCollections(
    $country: CountryCode
    $language: LanguageCode,
    $first: Int = 10
  ) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      nodes {
        ...Collection
      }
    }
  }
` as const;