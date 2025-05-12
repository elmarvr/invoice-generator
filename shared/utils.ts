import { crush } from "radash";

export function toQueryString(query: Record<string, unknown>) {
  const data = crush(query) as Record<string, any>;
  const params = new URLSearchParams();

  for (const key in data) {
    if (data[key] !== undefined) {
      params.append(key, data[key]);
    }
  }

  return params.toString();
}
