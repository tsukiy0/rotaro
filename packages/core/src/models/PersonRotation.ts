import {
  BaseError,
  Comparable,
  isArrayEqual,
  Serializer,
} from "@tsukiy0/tscore";
import { Days } from "./Days";
import { PersonDays, PersonDaysJson, PersonDaysSerializer } from "./PersonDays";
import { PersonList, PersonListJson, PersonListSerializer } from "./PersonList";

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

export type PersonRotationJson = {
  personList: PersonListJson;
  rotation: PersonDaysJson[];
  cursor: number;
};

export const PersonRotationSerializer: Serializer<
  PersonRotation,
  PersonRotationJson
> = {
  serialize: (input) => {
    return {
      personList: PersonListSerializer.serialize(input.personList),
      rotation: input.rotation.map(PersonDaysSerializer.serialize),
      cursor: input.cursor.toNumber(),
    };
  },
  deserialize: (input) => {
    return new PersonRotation(
      PersonListSerializer.deserialize(input.personList),
      input.rotation.map(PersonDaysSerializer.deserialize),
      new Days(input.cursor),
    );
  },
};
