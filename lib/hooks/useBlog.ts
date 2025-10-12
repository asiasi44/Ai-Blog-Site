// lib/hooks/useBlog.ts
"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBlogByAsin(asin: string) {
  const { data, error, isLoading } = useSWR(`/api/product/${asin}`, fetcher);
  return { data, error, isLoading };
}