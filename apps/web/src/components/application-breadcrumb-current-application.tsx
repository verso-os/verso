import * as React from "react";

import { BreadcrumbItem, BreadcrumbLink } from "$web/components/ui/breadcrumb";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "$web/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "$web/components/ui/popover";

import { Button } from "$web/components/ui/button";
import Link from "next/link";
import { Skeleton } from "$web/components/ui/skeleton";
import { cn } from "$web/lib/utils";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import { useApplicationsQuery } from "$web/hooks/api/useApplicationsQuery";
import { useParams } from "next/navigation";
import { useState } from "react";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];
export const ApplicationBreadcrumbCurrentApplication = () => {
    const params = useParams<{ app: string }>();
    const { data: application } = useApplicationQuery(params.app);
    const { data: applications } = useApplicationsQuery();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <BreadcrumbItem>
            <BreadcrumbLink asChild>
                {/* {application ? (
                    <Link href={`/applications/${application.id}`} className="flex items-center gap-2">
                        {application.name}
                    </Link>
                ) : (
                    <Skeleton className="w-[50px]" />
                )} */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {application ? application.name : <Skeleton className="w-[50px]" />}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search applications..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No application found.</CommandEmpty>
                                <CommandGroup>
                                    {applications?.map((a: any) => (
                                        <Link key={a.id} href={`/applications/${a.id}`}>
                                            <CommandItem>
                                                {a.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        application?.id === a.id ? "opacity-100" : "opacity-0",
                                                    )}
                                                />
                                            </CommandItem>
                                        </Link>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};
