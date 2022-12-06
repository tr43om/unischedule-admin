import React, { useState } from "react";
import { useSwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "@mui/lab";
import {
  MobileStepper,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { slidesPerView } from "../../constants";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { selectCurrentSchedule } from "../../store/ducks/schedule/selectors";

type ScheduleListActionsProps = {
  activeSlide: number;
};

const ScheduleListActions = ({ activeSlide = 1 }: ScheduleListActionsProps) => {
  const swipe = useSwiper();
  const scheduleLength = useSelector(selectCurrentSchedule)?.length;

  const count = Math.ceil(scheduleLength / slidesPerView);

  if (!count) return null;

  return (
    <Stack flexDirection="row" alignItems="center">
      <IconButton onClick={() => swipe.slidePrev()}>
        <NavigateBeforeIcon />
      </IconButton>
      <Typography>
        {activeSlide === 0 ? 1 : activeSlide} / {count}
      </Typography>
      <IconButton onClick={() => swipe.slideNext()}>
        <NavigateNextIcon />
      </IconButton>
    </Stack>
  );
};

export default ScheduleListActions;
