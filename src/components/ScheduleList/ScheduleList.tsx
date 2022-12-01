import React from "react";
import { FormFieldType, CourseFormValues } from "../../types";

import { useWatch } from "react-hook-form";
import { doc, collection, query, where, Query } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ScheduleList = ({ control }: FormFieldType<CourseFormValues>) => {
  const { group, weekday, weeks } = useWatch({
    control,
  });

  const scheduleRef = query(
    collection(
      db,
      `schedule/${group?.id || "0"}/week_${(weeks && weeks[0]) || "2"}`
    ),
    where("weekday", "==", weekday)
  ) as Query<{ subject: string }>;

  const [schedule] = useCollectionData<{ subject: string }>(scheduleRef);

  console.log(schedule);

  return (
    <div>{schedule && schedule.map((sch) => <div>{sch.subject}</div>)}</div>
  );
};

export default ScheduleList;
