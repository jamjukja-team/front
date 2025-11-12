"use client";
import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";

export default function RQHydrate({
    state,
    children,
}: {
    state: DehydratedState;
    children: React.ReactNode;
}) {
    return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}