import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <span className="mb-4 font-mono text-base text-muted-foreground">404</span>
            <h1 className="mb-4 text-3xl font-semibold">Page Not Found</h1>
            <p className="mb-8 text-muted-foreground">
                The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="group inline-flex items-center gap-2 text-base text-foreground transition-colors hover:text-muted-foreground"
            >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
            </Link>
        </Section>
    );
};

export default NotFound;
