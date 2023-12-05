export type DataCardData = {
  title: string;
  key: string;
  data?: Record<string, unknown> | Record<string, unknown>[];
};

export type DataCardField = {
  title: string;
  value: string | number;
  unit?: string;
};
