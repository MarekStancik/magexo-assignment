import { Money } from "@shopify/hydrogen";
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types";

export function ProductPrice({ price, compareAtPrice }: { price: MoneyV2; compareAtPrice: MoneyV2 }) {
    return (
        <div className="product-price">
            {(compareAtPrice.amount > price.amount) ? (
                <div className="compare-at-price">
                    {price ? <Money data={price} /> : null}
                    <s>
                        <Money data={compareAtPrice} />
                    </s>
                </div>
            ) : price ? (<Money data={price} />) : (<span>&nbsp;</span>)}
        </div>
    );
}
