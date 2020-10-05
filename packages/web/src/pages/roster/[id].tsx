import { RosterId } from "@rotaro/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NotFoundPage } from "../../components/ErrorPage";
import { ReadRosterPage } from "../../components/ReadRosterPage";

const Existing: React.FC = () => {
  const router = useRouter();
  const [rosterId, setRosterId] = useState<RosterId | undefined>();

  useEffect(() => {
    try {
      setRosterId(RosterId.fromString(router.query.id as string));
    } catch {
      setRosterId(undefined);
    }
  }, [router]);

  if (!rosterId) {
    return <NotFoundPage />;
  }

  return <ReadRosterPage rosterId={rosterId} />;
};

export default Existing;
