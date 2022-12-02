import React from "react";
import { FormFieldType, CourseFormValues } from "../../types";

import { useWatch } from "react-hook-form";
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

const ScheduleList = ({ control }: FormFieldType<CourseFormValues>) => {
  const { group, weekday, weeks } = useWatch({
    control,
  });

  const [schedule, setSchedule] = useState<
    {
      subject: string;
    }[]
  >([]);

  useEffect(() => {
    if (!weeks || !weekday || !group) return;
    (async () => {
      const schedule = await Promise.all(
        weeks.map(async (week) => {
          return getDocs(
            query(
              collection(db, `schedule/${group.id}/week_${week}`),
              where("weekday", "==", weekday)
            ) as Query<{ subject: string }>
          ).then(({ docs }) => docs.map((doc) => doc.data()));
        })
      ).then((data) => data.flat());
      setSchedule(schedule);
    })();
  }, [group, weekday, weeks]);

  return (
    <div>
      <div>{schedule && schedule.map((sch) => <div>{sch.subject}</div>)}</div>
    </div>
  );
};

export default ScheduleList;
