import React from "react";
import { Container, FormLabel, IconButton } from "@mui/material";
import {
  SelectGroupField,
  SelectWeekField,
  SelectWeekdayField,
  SelectLessonForm,
  ScheduleList,
} from "../../components";
import { useForm, DefaultValues, useWatch } from "react-hook-form";
import { FormControl, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { CourseFormValues } from "../../types";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSnackbar } from "notistack";
import {
  weeksToDays,
  addWeeks,
  subDays,
  differenceInBusinessDays,
  addDays,
  parse,
  add,
  addMinutes,
} from "date-fns";

import ru from "date-fns/locale/ru";
import { useSelector } from "react-redux";
import {
  currentGroupSelector,
  currentWeekdaySelector,
  currentWeeksSelector,
} from "../../store";

const CourseFormPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const group = useSelector(currentGroupSelector);
  const weekday = useSelector(currentWeekdaySelector);
  const weeks = useSelector(currentWeeksSelector);
  const defaultValues: DefaultValues<CourseFormValues> = {
    group,
    weeks,
    weekday,
    professorsAndAuditories: [
      {
        auditory: "",
        professor: {
          id: "",
          name: "",
        },
      },
    ],
    subject: "",
    start: new Date(new Date().setHours(0, 0, 0, 0)),
  };

  const {
    handleSubmit,
    control,

    formState: { isSubmitting },
  } = useForm<CourseFormValues>({
    defaultValues,
    resolver: yupResolver(addCourseSchema),
  });

  const isAddCourseFormVisible = group?.label && weekday && weeks.length !== 0;

  const addCourse = handleSubmit(
    async ({
      group,
      weekday,
      weeks,
      subject,
      professorsAndAuditories,
      start,
    }) => {
      const groupRef = doc(collection(db, "schedule"), group.id);
      const courseRef = (week: string) =>
        collection(db, `schedule/${group.id}/week_${week}`);
      const successMessage = `Пара "${subject}" добавлена для группы ${group.label} `;

      const startOfAcademicYear = new Date(
        `Sep 1, ${new Date().getFullYear()}`
      );

      const academicWeek = subDays(
        addWeeks(startOfAcademicYear, parseInt(weeks[0])),
        10
      );

      const academicDay = parse(weekday, "eeee", academicWeek, {
        locale: ru,
      });

      const lessonStarts = add(academicDay, {
        hours: start.getHours(),
        minutes: start.getMinutes(),
      });

      const lessonEnds = addMinutes(lessonStarts, 95);

      const scheduleData = {
        subject,
        professorsAndAuditories,
        weekday,
        lessonStarts,
        lessonEnds,
      };

      try {
        await setDoc(groupRef, {
          id: group.id,
          group: group.label,
        });

        weeks.forEach(
          async (week) =>
            await addDoc(courseRef(week), { ...scheduleData, week })
        );

        enqueueSnackbar(successMessage, {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Что-то пошло не так. Попробуйте еще раз...", {
          variant: "error",
        });
      }
    }
  );

  return (
    <Container>
      <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <SelectGroupField control={control} />
          <SelectWeekField control={control} />
          <SelectWeekdayField control={control} />
          <ScheduleList control={control} />
          {isAddCourseFormVisible && <SelectLessonForm control={control} />}
        </Stack>

        {isAddCourseFormVisible && (
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
            sx={{ maxWidth: "200px" }}
            onClick={addCourse}
            disabled={isSubmitting}
          >
            Добавить
          </LoadingButton>
        )}
      </FormControl>
    </Container>
  );
};

const addCourseSchema = yup.object({
  group: yup
    .object()
    .shape({
      id: yup.string().min(1).required(),
      label: yup.string().min(1, "Выберите группу").required(),
    })
    .required(`Выберите группу`),
  professorsAndAuditories: yup
    .array()
    .of(
      yup.object().shape({
        auditory: yup.string().min(1, "Заполните номер аудитории"),
        professor: yup.object().shape({
          name: yup.string().min(1, "Выберите преподавателя"),
        }),
      })
    )
    .min(1, "Добавьте хотя бы одного преподавателя"),

  weeks: yup.array().min(1, "Выберите хотя бы одну неделю"),
  weekday: yup.string().required("Выберите день недели"),
  subject: yup.string().required("Выберите предмет"),
  start: yup
    .date()
    .typeError("Введеное время не корректно")
    .min(
      new Date(new Date().setHours(8, 45, 0, 0)),
      "Пара не может начаться раньше 8:45"
    )
    .required("Выберите начало пары"),
});

export default CourseFormPage;
