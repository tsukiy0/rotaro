import React from "react";
import { PersonListInput } from "../../components/PersonListInput";

const New: React.FC = () => {
  return (
    <div>
      <PersonListInput value={{} as any} onChange={console.log} />
    </div>
  );
};

export default New;
