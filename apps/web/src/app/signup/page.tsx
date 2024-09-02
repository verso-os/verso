"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$web/components/ui/card";
import { api } from "$web/lib/api";
import { useForm } from "@tanstack/react-form";

export default function SignUp() {
    const form = useForm({
        defaultValues: {
            appName: "",
        },
        onSubmit: async ({ value }) => {
            // const res = await api.v1.auth.
        },
    });
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account to start using Verso.</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
        </div>
    );
}
