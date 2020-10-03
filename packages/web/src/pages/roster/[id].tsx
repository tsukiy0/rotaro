import { useRouter } from "next/router";
import React from "react";

const Existing: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;

  if (!id) {
    return null;
  }

  return <div>{id}</div>;
};

export default Existing;
