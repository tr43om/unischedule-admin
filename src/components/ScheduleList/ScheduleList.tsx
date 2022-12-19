import React, { useCallback } from "react";
import { FormFieldType, CourseFormValues } from "../../types";

import { useWatch, useController, useFormState } from "react-hook-form";
import {
  doc,
  collection,
  query,
  where,
  Query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { ScheduleType } from "../../types";
import { ScheduleCard } from "../ScheduleCard";
import format from "date-fns/format";
import { ru } from "date-fns/locale";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  EffectCoverflow,
} from "swiper";
import { nanoid } from "nanoid";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { ScheduleListActions } from "../ScheduleListActions";
import { EffectCards } from "swiper";
import { slidesPerView } from "../../constants";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { selectCurrentWeekday, useAppDispatch } from "../../store";
import { setCurrentSchedule } from "../../store";
import { selectCurrentSchedule } from "../../store";
import { useSelector } from "react-redux";
import {
  currentGroupSelector,
  currentWeekdaySelector,
  currentWeeksSelector,
} from "../../store/ducks/schedule/selectors";

const ScheduleList = ({ control }: FormFieldType<CourseFormValues>) => {
  const dispatch = useAppDispatch();
  const schedule = useSelector(selectCurrentSchedule);
  const group = useSelector(currentGroupSelector);
  const weekday = useSelector(currentWeekdaySelector);
  const weeks = useSelector(currentWeeksSelector);

  const disallowedToFetch = !weeks || !weekday || !group;

  const { isSubmitted } = useFormState({
    control,
  });

  const [activeSlide, setActiveSlide] = useState<number>(1);

  const fetchSchedule = useCallback(async () => {
    if (disallowedToFetch) return;

    console.log("FETCH SCHEDULE");

    const ref = (week: string) =>
      query(
        collection(db, `schedule/${group.id}/week_${week}`),
        where("weekday", "==", weekday)
      ) as Query<ScheduleType>;

    const promises = weeks.map(async (week) => {
      return await getDocs(ref(week)).then(({ docs }) =>
        docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    const result = (await Promise.all(promises)).flat();

    dispatch(setCurrentSchedule(result));
  }, [disallowedToFetch, group?.id, weeks, dispatch, weekday]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule, isSubmitted]);

  if (!schedule.length) return null;

  return (
    <Box>
      <Typography>Найденные предметы: </Typography>

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          EffectCards,
          EffectCoverflow,
        ]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        onSlideChange={({ activeIndex }) => setActiveSlide(activeIndex + 1)}
      >
        {schedule && (
          <>
            {schedule.map((sch) => (
              <SwiperSlide key={nanoid()}>
                <ScheduleCard schedule={sch} />
              </SwiperSlide>
            ))}
          </>
        )}

        <ScheduleListActions activeSlide={activeSlide} />
      </Swiper>
    </Box>
  );
};

export default ScheduleList;
