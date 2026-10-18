// Fills `{key}` placeholders in dictionary strings. Safe on server and client.
export const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
