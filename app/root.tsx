import { Links, Meta, Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import favicon from "~/assets/favicon.svg";
import appStyles from "~/styles/app.css?url";
import resetStyles from "~/styles/reset.css?url";
import tailwindCss from "./styles/tailwind.css?url";
import { PageLayout } from "./components/PageLayout";

export function links() {
    return [
        { rel: "stylesheet", href: tailwindCss },
        { rel: "stylesheet", href: resetStyles },
        { rel: "stylesheet", href: appStyles },
        {
            rel: "preconnect",
            href: "https://cdn.shopify.com",
        },
        {
            rel: "preconnect",
            href: "https://shop.app",
        },
        { rel: "icon", type: "image/svg+xml", href: favicon },
    ];
}

export function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <PageLayout>{children}</PageLayout>
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary() {
    const error = useRouteError();
    let errorMessage = "Unknown error";
    let errorStatus = 500;

    if (isRouteErrorResponse(error)) {
        errorMessage = error?.data?.message ?? error.data;
        errorStatus = error.status;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="route-error">
            <h1>Oops</h1>
            <h2>{errorStatus}</h2>
            {errorMessage && (
                <fieldset>
                    <pre>{errorMessage}</pre>
                </fieldset>
            )}
        </div>
    );
}
