import { Config, ConfigKeyNotFoundError } from "@tsukiy0/tscore";

export class DevConfig implements Config {
  private readonly config: Record<string, string> = {
    API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  };

  public readonly get = (key: string): string => {
    const value = this.config[key];

    if (!value) {
      throw new ConfigKeyNotFoundError(key);
    }

    return value;
  };
}
