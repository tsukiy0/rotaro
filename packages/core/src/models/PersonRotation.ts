import { BaseError, Comparable, isArrayEqual } from "@tsukiy0/tscore";
import { Days } from "./Days";
import { PersonDays } from "./PersonDays";
import { PersonList } from "./PersonList";

export class CursorGreaterThanTotalDaysError extends BaseError {}
export class PersonNotFoundError extends BaseError {}

export class PersonRotation implements Comparable {
  constructor(
    public readonly personList: PersonList,
    public readonly rotation: readonly PersonDays[],
    public readonly cursor: Days,
  ) {
    if (this.cursor.greaterThan(this.getTotalDays())) {
      throw new CursorGreaterThanTotalDaysError();
    }

    for (const item of rotation) {
      const person = personList.items.find((_) => _.id.equals(item.personId));

      if (!person) {
        throw new PersonNotFoundError();
      }
    }
  }

  public readonly getTotalDays = (): Days => {
    return new Days(
      this.rotation.reduce((acc, item) => {
        return acc + item.days.toNumber();
      }, 0),
    );
  };

  public readonly tick = (): PersonRotation => {
    const calculateNewCursor = () => {
      const totalDays = this.getTotalDays();

      if (totalDays.equals(this.cursor)) {
        return this.cursor.reset();
      }

      return this.cursor.increment();
    };

    return new PersonRotation(
      this.personList,
      this.rotation,
      calculateNewCursor(),
    );
  };

  public readonly equals = (input: this): boolean => {
    return (
      this.personList.equals(input.personList) &&
      isArrayEqual(this.rotation, input.rotation, (a, b) => a.equals(b)) &&
      this.cursor.equals(input.cursor)
    );
  };
}
