import * as React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  CircularProgress,
  FormHelperText,
  Typography,
} from "@material-ui/core";

import { useParticipantQuery } from "../../generated/graphql";

export default function ListTable() {
  const router = useRouter();
  const { data, loading } = useParticipantQuery({
    variables: {
      code: router.query.code as string,
    },
    skip: !router.query.code,
  });

  if (loading || !data) {
    return <CircularProgress />;
  }

  const participant = data.participant;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography color={"textSecondary"}>Código:</Typography>
      <FormHelperText>{participant.code}</FormHelperText>
      <Typography color={"textSecondary"}>Nome:</Typography>
      <FormHelperText>{participant.name}</FormHelperText>
      <Typography color={"textSecondary"}>Comprovativo:</Typography>
      <FormHelperText>
        {participant.paymentProofUrl && <NextLink href={participant.paymentProofUrl}>Ver</NextLink>}
      </FormHelperText>
    </div>
  );
}
