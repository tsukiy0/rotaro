import { Config, BaseError, ConfigKeyNotFoundError } from "@tsukiy0/tscore";
import fetch from "isomorphic-fetch";

export class RemoteConfigNotFoundError extends BaseError {}

export class ProdConfig implements Config {
  private constructor(private readonly config: Record<string, string>) {}

  public static readonly default = async (): Promise<ProdConfig> => {
    const res = await fetch("/config.json");

    if (res.status !== 200) {
      throw new RemoteConfigNotFoundError();
    }

    const body = await res.json();

    return new ProdConfig(body);
  };

  public readonly get = (key: string): string => {
    const value = this.config[key];

    if (!value) {
      throw new ConfigKeyNotFoundError(key);
    }

    return value;
  };
}
