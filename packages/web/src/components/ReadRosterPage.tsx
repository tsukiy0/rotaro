import { Box, Heading, useTheme, Stack, Badge } from "@chakra-ui/core";
import { Roster, RosterId } from "@rotaro/core";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useAlert } from "../contexts/AlertContext/AlertContext";
import { useServices } from "../contexts/ServicesContext/ServicesContext";
import { BaseProps } from "../models/BaseProps";
import { Card, CardHeader } from "./Card";
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
      <Stack spacing={4}>
        {roster.rotation.rotation.map((_, i) => {
          const person = roster.rotation.personList.items.find((person) =>
            person.id.equals(_.personId),
          );

          if (!person) {
            return null;
          }

          return (
            <Box key={i}>
              <Card
                header={
                  <CardHeader
                    left={
                      <Stack direction="row">
                        <Heading size="sm">{person.name}</Heading>
                        <Badge>{_.days.toNumber()}</Badge>
                      </Stack>
                    }
                    right={
                      <Box>
                        {roster.rotation
                          .getActivePerson()
                          .equals(_.personId) && (
                          <CheckCircleIcon color={theme.colors.green[400]} />
                        )}
                      </Box>
                    }
                  />
                }
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
