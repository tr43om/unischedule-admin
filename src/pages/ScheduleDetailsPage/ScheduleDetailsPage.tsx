import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  useParams,
  useNavigate,
  useNavigation,
  NavigateFunction,
} from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector } from "react-redux";
import { selectCurrentSchedule } from "../../store/ducks/schedule/selectors";
import { SelectLessonForm } from "../../components";
import { SubjectUpdateValues } from "../../types";
import { DefaultValues } from "react-hook-form/dist/types";
import { useForm } from "react-hook-form/dist/useForm";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

type NavigationBackButtonProps = {
  navigate: NavigateFunction;
};

const NavigationBackButton = ({ navigate }: NavigationBackButtonProps) => {
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="contained"
      size="small"
      color="secondary"
      sx={{
        borderRadius: 4,
        aspectRatio: 1,
        position: "absolute",
        top: ({ mixins: { toolbar } }) => toolbar.height,
        left: -130,
      }}
    >
      <NavigateBeforeIcon />
    </Button>
  );
};

const ScheduleDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const schedule = useSelector(selectCurrentSchedule);

  const defaultValues: DefaultValues<SubjectUpdateValues> = {
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
  } = useForm<SubjectUpdateValues>({
    defaultValues,
    resolver: yupResolver(updateSubjectSchema),
  });
  const scheduleDetails = schedule.find((sch) => sch.id === params.id);

  return (
    <Box>
      <NavigationBackButton navigate={navigate} />
      {/* <SelectLessonForm control={control} /> */}
      {scheduleDetails && <Typography>{scheduleDetails.subject}</Typography>}
    </Box>
  );
};

const updateSubjectSchema = yup.object({
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

export default ScheduleDetailsPage;
