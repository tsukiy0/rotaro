import { BaseError, Comparable, isArrayEqual } from "@tsukiy0/tscore";
import { Days } from "./Days";
import { PersonDays } from "./PersonDays";
import { PersonList } from "./PersonList";

export class CursorGreaterThanTotalRotationDaysError extends BaseError {}
export class PersonNotFoundError extends BaseError {}

export class PersonRotation implements Comparable {
  constructor(
    public readonly personList: PersonList,
    public readonly rotation: readonly PersonDays[],
    public readonly cursor: Days,
  ) {
    if (cursor.toNumber() > this.getTotalRotationDays(rotation).toNumber()) {
      throw new CursorGreaterThanTotalRotationDaysError();
    }

    for (const item of rotation) {
      const person = personList.items.find((_) => _.id.equals(item.personId));

      if (!person) {
        throw new PersonNotFoundError();
      }
    }
  }

  private readonly getTotalRotationDays = (
    rotation: readonly PersonDays[],
  ): Days => {
    return new Days(
      rotation.reduce((acc, item) => {
        return acc + item.days.toNumber();
      }, 0),
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
