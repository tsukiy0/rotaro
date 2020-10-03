import {
  RosterNotFoundError,
  RosterNotFoundErrorSerializer,
} from "../services/RosterService/RosterNotFoundError";

export const ErrorSerializerMap = {
  [RosterNotFoundError.name]: RosterNotFoundErrorSerializer,
};
