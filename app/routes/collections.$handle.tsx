import { MetaFunction, NavLink, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/server-runtime";
import { getPaginationVariables } from "@shopify/hydrogen";
import { PaginatedResourceSection } from "~/components/PaginatedResourceSection";
import { ProductCard } from "~/components/ProductCard";
import { PRODUCT_ITEM_FRAGMENT } from "~/graphql/product.fragment";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return [{ title: `MageXo | ${data?.collection.title ?? ""}` }];
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
    const { handle } = params;
    const { storefront } = context;
    const paginationVariables = getPaginationVariables(request, {
        pageBy: 4,
    });

    if (!handle) {
        throw redirect("/collections");
    }

    const { collection } = await storefront.query(COLLECTION_QUERY, {
        variables: { handle, ...paginationVariables },
        // Add other queries here, so that they are loaded in parallel
    });

    if (!collection) {
        throw new Response(`Collection ${handle} not found`, {
            status: 404,
        });
    }

    return {
        collection,
    };
}

export default function Collection() {
    const { collection } = useLoaderData<typeof loader>();

    return (
        <div className="w-full">
            <div className="flex gap-2 items-center">
                <NavLink to="/collections">
                    <h1>Collections</h1>
                </NavLink>
                <span className="text-2xl">/</span>
                <h1 className="truncate collection-title">{collection.title}</h1>
            </div>
            <PaginatedResourceSection connection={collection.products} resourcesClassName="products-grid">
                {({ node: product }) => (
                    <ProductCard key={product.id} product={product}/>
                )}
            </PaginatedResourceSection>
        </div>
    );
}

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;