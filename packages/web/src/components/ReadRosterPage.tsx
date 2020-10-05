import { Box, Heading, useTheme } from "@chakra-ui/core";
import { Roster, RosterId } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { useServices } from "../contexts/ServicesContext/ServicesContext";
import { BaseProps } from "../models/BaseProps";
import { Card } from "./Card";
import { LoadingPage } from "./LoadingPage";

export const ReadRosterPage: React.FC<BaseProps<{
  rosterId: RosterId;
}>> = ({ className, rosterId }) => {
  const theme = useTheme();
  const { rosterService } = useServices();
  const { onError } = useAlert();
  const [roster, setRoster] = useState<Roster | undefined>();

  useEffect(() => {
    const onRead = async () => {
      try {
        setRoster(undefined);
        const roster = await rosterService.getRoster(rosterId);
        setRoster(roster);
      } catch (err) {
        onError(err);
      }
    };

    onRead();
  }, [rosterId, rosterService, onError]);

  if (!roster) {
    return <LoadingPage />;
  }

  return (
    <Box className={className} padding={theme.space[4]}>
      {roster.rotation.rotation.map((_, i) => {
        return (
          <Card key={i}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading as="h1" size="md">
                {
                  roster.rotation.personList.items.find((person) =>
                    person.id.equals(_.personId),
                  )?.name
                }
              </Heading>
              <Heading as="h2" size="sm">
                {_.days.toNumber()}
              </Heading>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};
