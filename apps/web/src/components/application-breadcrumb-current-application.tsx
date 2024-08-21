import { BreadcrumbItem, BreadcrumbLink } from "$web/components/ui/breadcrumb";

import Link from "next/link";
import { Skeleton } from "$web/components/ui/skeleton";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import { useApplicationsQuery } from "$web/hooks/api/useApplicationsQuery";
import { useParams } from "next/navigation";

export const ApplicationBreadcrumbCurrentApplication = () => {
    const params = useParams<{ app: string }>();
    const { data: application } = useApplicationQuery(params.app);
    const { data: applications } = useApplicationsQuery();
    return (
        <BreadcrumbItem>
            <BreadcrumbLink asChild>
                {application ? (
                    <Link href={`/applications/${application.id}`} className="flex items-center gap-2">
                        {application.name}
                    </Link>
                ) : (
                    <Skeleton className="w-[50px]" />
                )}
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};
