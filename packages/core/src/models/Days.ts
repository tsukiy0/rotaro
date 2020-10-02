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

  public readonly equals = (input: this): boolean => {
    return this.value === input.value;
  };
}

export const DaysRandomizer = {
  random: (): Days => {
    return new Days(NumberRandomizer.random());
  },
};
