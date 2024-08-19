import * as React from "react";
import { Pagination } from "@shopify/hydrogen";

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */

export function PaginatedResourceSection<NodesType>({
    connection,
    children,
    resourcesClassName,
}: {
    connection: React.ComponentProps<typeof Pagination<NodesType>>["connection"];
    children: React.FunctionComponent<{ node: NodesType; index: number }>;
    resourcesClassName?: string;
}) {
    return (
        <Pagination connection={connection}>
            {({ nodes, isLoading, PreviousLink, NextLink }) => {
                const resoucesMarkup = nodes.map((node, index) =>
                    children({ node, index }),
                );

                return (
                    <div>
                        <div className="w-full flex my-4">
                            <PreviousLink>
                                {isLoading ? "Loading..." : <span>← Previous Page</span>}
                            </PreviousLink>
                            <NextLink className="ml-auto">
                                {isLoading ? "Loading..." : <span>Next Page →</span>}
                            </NextLink>
                        </div>
                        {resourcesClassName ? (
                            <div className={resourcesClassName}>{resoucesMarkup}</div>
                        ) : (
                            resoucesMarkup
                        )}
                    </div>
                );
            }}
        </Pagination>
    );
}
