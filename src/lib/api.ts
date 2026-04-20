export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }

  return (await res.json()) as T;
}

export type Service = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string | null;
  image_url: string | null;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  client_name: string | null;
  country: string | null;
  short_description: string;
  full_description: string;
  completion_date: string | null;
  cover_image_url: string | null;
  gallery_image_urls: string[];
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  category: { id: number; name: string; slug: string } | null;
  published_at: string | null;
};

export type Testimonial = {
  id: number;
  quote: string;
  client_name: string | null;
  client_title: string | null;
  client_company: string | null;
  country: string | null;
};

export type Faq = { id: number; question: string; answer: string };

export type Setting = { key: string; group: string; value: unknown };

type CollectionResponse<T> = { data: T[] };

export const api = {
  services: () => apiFetch<CollectionResponse<Service>>("/services"),
  service: (slug: string) => apiFetch<{ data: Service }>(`/services/${slug}`),
  projects: (params?: { category?: string; country?: string }) => {
    const qs = new URLSearchParams();
    if (params?.category) qs.set("category", params.category);
    if (params?.country) qs.set("country", params.country);
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return apiFetch<CollectionResponse<Project>>(`/projects${suffix}`);
  },
  project: (slug: string) => apiFetch<{ data: Project }>(`/projects/${slug}`),
  posts: (params?: { category?: string }) => {
    const qs = new URLSearchParams();
    if (params?.category) qs.set("category", params.category);
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return apiFetch<CollectionResponse<Post>>(`/posts${suffix}`);
  },
  post: (slug: string) => apiFetch<{ data: Post }>(`/posts/${slug}`),
  testimonials: () => apiFetch<CollectionResponse<Testimonial>>("/testimonials"),
  faqs: () => apiFetch<CollectionResponse<Faq>>("/faqs"),
  settings: () => apiFetch<CollectionResponse<Setting>>("/settings"),
};

export async function apiPost(
  path: string,
  payload: unknown
): Promise<{ ok: boolean; id?: number }> {
  return apiFetch<{ ok: boolean; id?: number }>(path, {
    method: "POST",
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  });
}

