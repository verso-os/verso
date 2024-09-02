import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "$web/components/ui/breadcrumb";

import { ApplicationBreadcrumbCurrentApplication } from "$web/components/application-breadcrumb-current-application";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function ApplicationBreadcrumbs() {
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

    return (
        <Breadcrumb className="p-4 border-b bg-primary-foreground">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/applications" className="flex items-center gap-2">
                            <Image src="/logo.svg" alt="logo" width={16} height={16} />
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/applications" className="flex items-center gap-2">
                            Applications
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <ApplicationBreadcrumbCurrentApplication />
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
