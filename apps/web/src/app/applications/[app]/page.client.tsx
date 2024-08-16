"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "$web/components/ui/tabs";
import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import { useApplicationUsersQuery } from "$web/hooks/api/useApplicationUsersQuery";
import { api } from "$web/lib/api";
import { useQuery } from "@tanstack/react-query";

export function ApplicationPageClient({ params }: { params: { app: string } }) {
    const { data: application } = useApplicationQuery(params.app);
    const { data: users } = useApplicationUsersQuery(params.app);
    console.log(users);
    return (
        <Tabs className="" defaultValue="home">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="home">
                <h1>Application {application?.name}</h1>
            </TabsContent>
            <TabsContent value="users">
                <h1>Users</h1>
                {users?.map((user) => <div key={user.id}>{user.email}</div>)}
            </TabsContent>
        </Tabs>
    );
}
