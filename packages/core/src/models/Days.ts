import { BaseError, Comparable, NumberRandomizer } from "@tsukiy0/tscore";

export class DaysMustBeGreaterThanZeroError extends BaseError {
  constructor(value: number) {
    super({
      value,
    });
  }
}

export class Days implements Comparable {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new DaysMustBeGreaterThanZeroError(value);
    }
  }

  public readonly toNumber = (): number => {
    return this.value;
  };

  public readonly increment = (): Days => {
    return new Days(this.value + 1);
  };

  public readonly reset = (): Days => {
    return new Days(1);
  };

  public readonly greaterThan = (input: Days): boolean => {
    return this.value > input.value;
  };

  public readonly equals = (input: this): boolean => {
    return this.value === input.value;
  };
}

export const DaysRandomizer = {
  random: (): Days => {
    return new Days(NumberRandomizer.random());
  },
};
