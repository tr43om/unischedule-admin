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
import { Card, CardHeader, Stack } from "@mui/material";
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
import "swiper/css/effect-cards";
import "swiper/css/pagination";

const ScheduleList = ({ control }: FormFieldType<CourseFormValues>) => {
  const { group, weekday, weeks } = useWatch({
    control,
  });

  const { isSubmitted } = useFormState({
    control,
  });

  const [schedule, setSchedule] = useState<ScheduleType[]>([]);

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
          ).then(({ docs }) => docs.map((doc) => doc.data()));
        })
      ).then((data) => data.flat());
      setSchedule(schedule);
    })();
  }, [group, weekday, weeks, isSubmitted]);

  return (
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
      grabCursor={true}
      spaceBetween={50}
      slidesPerView={2}
      pagination={{ clickable: true }}
    >
      {schedule &&
        schedule.map((sch) => (
          <SwiperSlide key={nanoid()}>
            <ScheduleCard schedule={sch} />
          </SwiperSlide>
        ))}

      <ScheduleListActions />
    </Swiper>
  );
};

export default ScheduleList;
