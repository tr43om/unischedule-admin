import React from "react";
import { FormFieldType, CourseFormValues } from "../../types";

import { useWatch, useController, useFormState } from "react-hook-form";
import {
  doc,
  collection,
  query,
  where,
  Query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Card, CardHeader, Stack, Typography } from "@mui/material";
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
import { useAppDispatch } from "../../store";
import { setCurrentSchedule } from "../../store";
import { selectCurrentSchedule } from "../../store";
import { useSelector } from "react-redux";

const ScheduleList = ({ control }: FormFieldType<CourseFormValues>) => {
  const dispatch = useAppDispatch();
  const schedule = useSelector(selectCurrentSchedule);
  const { group, weekday, weeks } = useWatch({
    control,
  });

  const { isSubmitted } = useFormState({
    control,
  });

  // const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(1);

  useEffect(() => {
    if (!weeks || !weekday || !group) return;
    (async () => {
      const schedule = await Promise.all(
        weeks.map(async (week) => {
          return getDocs(
            query(
              collection(db, `schedule/${group.id}/week_${week}`),
              where("weekday", "==", weekday)
            ) as Query<ScheduleType>
          ).then(({ docs }) =>
            docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        })
      ).then((data) => data.flat());
      // setSchedule(schedule);
      dispatch(setCurrentSchedule(schedule));
    })();
  }, [group, weekday, weeks, isSubmitted]);

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
