import { Card, CardHeader, Stack } from "@mui/material";
import React from "react";
import { ScheduleType } from "../../types";
import { toDate } from "date-fns";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export type ScheduleCardProps = {
  schedule: ScheduleType;
};

const ScheduleCard = ({ schedule }: ScheduleCardProps) => {
  const start = schedule.lessonStarts.toDate().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const end = schedule.lessonEnds.toDate().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const courseTime = `${schedule.weekday}, ${start} - ${end}`;

  return (
    <Card>
      <CardHeader title={schedule.subject} subheader={courseTime} />
      <CardContent>
        <Stack gap={2}>
          {schedule.professorsAndAuditories.map((el) => (
            <>
              <Typography>{el.professor.name}</Typography>
              <Typography>{el.auditory} кабинет</Typography>
            </>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
