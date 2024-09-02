"use client";
import { Button } from "$web/components/ui/button";
import { Input } from "$web/components/ui/input";
import { Label } from "$web/components/ui/label";
import { api } from "$web/lib/api";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

export default function NewApplication() {
    const form = useForm({
        defaultValues: {
            appName: "",
        },
        onSubmit: async ({ value }) => {
            const res = await api.v1.app.$post({
                json: {
                    name: value.appName,
                },
            });
            console.log(res);
        },
    });

    return (
        <>
            <h1 className="text-4xl py-6 font-bold text-primary">New Application</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="appName"
                    children={(f) => (
                        <div className="space-y-2">
                            <Label htmlFor="appName" className="text-sm font-medium text-primary/50">
                                Application Name
                            </Label>
                            <Input
                                name={f.name}
                                value={f.state.value}
                                onBlur={f.handleBlur}
                                onChange={(e) => f.handleChange(e.target.value)}
                            />
                        </div>
                    )}
                />
                <Button type="submit">Create</Button>
            </form>
        </>
    );
}
