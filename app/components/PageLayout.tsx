import { Footer } from "./Footer";
import { Header } from "./Header";

interface PageLayoutProps {
    children?: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {

    return (<>
        <Header />
        <main className="flex-1 min-md:px-24 max-md:px-6 justify-center">
            {children}
        </main>
        <Footer />
    </>);
}