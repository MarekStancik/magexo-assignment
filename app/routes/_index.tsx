import { LoaderFunctionArgs, redirect } from "@remix-run/server-runtime";
import { MetaFunction } from "@shopify/remix-oxygen";

export const meta: MetaFunction = () => {
    return [{ title: "MageXo | Home" }];
};

export async function loader(args: LoaderFunctionArgs) {
    return redirect("/collections");
}