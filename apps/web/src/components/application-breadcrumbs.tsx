import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "$web/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";

import Link from "next/link";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import { useMemo } from "react";

export function ApplicationBreadcrumbs() {
    const params = useParams<{ app: string }>();
    const { data } = useApplicationQuery(params.app);
    const pathname = usePathname();

    const page = useMemo(() => {
        const parts = pathname.split("/");
        const last = parts[parts.length - 1];
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        if (uuidRegex.test(last)) {
            return "Home";
        }

        return last.charAt(0).toUpperCase() + last.slice(1);
    }, [pathname]);

    if (!data) {
        return null;
    }

    return (
        <Breadcrumb className="p-4 border-b bg-primary-foreground">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/applications" className="flex items-center gap-2">
                            Applications
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={`/applications/${data.id}`} className="flex items-center gap-2">
                            {data.name}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
