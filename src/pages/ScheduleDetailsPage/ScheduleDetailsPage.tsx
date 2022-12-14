import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import React from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector } from "react-redux";
import {
  selectCurrentSchedule,
  currentGroupSelector,
  currentWeeksSelector,
  currentWeekdaySelector,
} from "../../store/ducks/schedule/selectors";
import { SelectLessonForm } from "../../components";
import { RoutesPaths, CourseFormValues } from "../../types";
import { DefaultValues } from "react-hook-form/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";
import { addMinutes } from "date-fns";
import { useSnackbar } from "notistack";

import { DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import { deleteDoc } from "firebase/firestore";

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
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const schedule = useSelector(selectCurrentSchedule);
  const group = useSelector(currentGroupSelector);
  const weeks = useSelector(currentWeeksSelector);
  const weekday = useSelector(currentWeekdaySelector);

  const scheduleDetails = schedule?.find((sch) => sch.id === params.id);

  const shouldRedirect = !schedule || !group || !weeks || !weekday;

  useEffect(() => {
    if (shouldRedirect) navigate(RoutesPaths.course);
  }, [shouldRedirect, navigate]);

  const defaultValues: DefaultValues<CourseFormValues> = {
    group,
    weekday,
    weeks,
    professorsAndAuditories: scheduleDetails?.professorsAndAuditories,
    subject: scheduleDetails?.subject,
    start: scheduleDetails?.lessonStarts.toDate(),
  };
  const { handleSubmit, control } = useForm<CourseFormValues>({
    defaultValues,
    resolver: yupResolver(updateSubjectSchema),
  });

  const scheduleRef = doc(
    db,
    `schedule/${group?.id}/week_${scheduleDetails?.week}/${params.id}`
  );

  const updateSchedule = handleSubmit(
    async ({ start, subject, professorsAndAuditories }) => {
      await updateDoc(scheduleRef, {
        subject,
        lessonStarts: start,
        lessonEnds: addMinutes(start, 95),
        professorsAndAuditories,
      });

      const successMessage = `???????????????????? ??????????????????`;
      enqueueSnackbar(successMessage, {
        variant: "success",
      });
    }
  );

  const deleteSchedule = async () => {
    await deleteDoc(scheduleRef).then(() => navigate(-1));

    const successMessage = `???????????????????? ??????????????`;
    enqueueSnackbar(successMessage, {
      variant: "success",
    });
  };

  return (
    <Card>
      <CardHeader
        title={<>{scheduleDetails?.week} ????????????</>}
        subheader={<>{scheduleDetails?.weekday}</>}
        action={
          <IconButton onClick={deleteSchedule}>
            <DeleteOutlineIcon />
          </IconButton>
        }
      />

      <CardContent>
        {/* <NavigationBackButton navigate={navigate} /> */}
        <SelectLessonForm control={control} />
        <Button variant="contained" sx={{ mt: 3 }} onClick={updateSchedule}>
          ?????????????????? ??????????????????
        </Button>
      </CardContent>
    </Card>
  );
};

const updateSubjectSchema = yup.object({
  professorsAndAuditories: yup
    .array()
    .of(
      yup.object().shape({
        auditory: yup.string().min(1, "?????????????????? ?????????? ??????????????????"),
        professor: yup.object().shape({
          name: yup.string().min(1, "???????????????? ??????????????????????????"),
        }),
      })
    )
    .min(1, "???????????????? ???????? ???? ???????????? ??????????????????????????"),

  subject: yup.string().required("???????????????? ??????????????"),
  start: yup
    .date()
    .typeError("???????????????? ?????????? ???? ??????????????????")
    .min(
      new Date(new Date().setHours(8, 45, 0, 0)).getHours(),
      "???????? ???? ?????????? ???????????????? ???????????? 8:45"
    )
    .required("???????????????? ???????????? ????????"),
});

export default ScheduleDetailsPage;
