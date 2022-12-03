import React from "react";
import { useSwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "@mui/lab";

const ScheduleListActions = () => {
  const { activeIndex, params, slides } = useSwiper();

  console.log(slides.length);
  console.log(activeIndex);

  return <div>ScheduleListActions</div>;
};

export default ScheduleListActions;
