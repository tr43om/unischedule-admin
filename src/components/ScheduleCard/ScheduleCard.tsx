import React from "react";

import {
  Card,
  CardHeader,
  IconButton,
  Stack,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { ScheduleType } from "../../types";
import { useSwiperSlide } from "swiper/react";
import LaunchIcon from "@mui/icons-material/Launch";

import { Link as RouterLink } from "react-router-dom";
import { RoutesPaths } from "../../types/index";

export type ScheduleCardProps = {
  schedule: ScheduleType;
};

const ScheduleCard = ({ schedule }: ScheduleCardProps) => {
  const slide = useSwiperSlide();
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
    <Box
      component={RouterLink}
      to={`${RoutesPaths.course}/${schedule.id}`}
      sx={{ cursor: "pointer", textDecoration: "none" }}
    >
      <Card variant="elevation" elevation={3}>
        <CardHeader
          title={schedule.subject}
          subheader={courseTime}
          action={
            <IconButton>
              <LaunchIcon fontSize="small" />
            </IconButton>
          }
        />
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
    </Box>
  );
};

export default ScheduleCard;
