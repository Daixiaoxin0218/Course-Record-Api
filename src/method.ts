/**
 * 整数转换
 * @param course 课程数据 obj
 * @returns 处理返回
 */
export function convertCourseValuesToNumbers(course: any) {
  const { course_price, class_hour, surplus, ...rest } = course;
  const state = courseStatusChange(course);
  return {
    ...rest,
    state,
    course_price: parseInt(course_price),
    class_hour: parseInt(class_hour),
    surplus: parseInt(surplus),
    every_class: course_price / class_hour,
  };
}

/**
 * 判断课程状态
 * @param state 课程数据 obj
 * @returns 状态类型
 */
function courseStatusChange(state: any) {
  const { deadline_date, surplus, stop_card, resume_classes } = state;
  const currentTime: number = Date.now();
  const deadlineTime = parseInt(deadline_date);
  
  if (currentTime > deadlineTime) return 3;
  if (surplus === '0' || surplus === 0) return 3;
  if (stop_card) {
    if (resume_classes && currentTime < deadlineTime && surplus !== 0) return 1;
    else return 2;
  } else return 1;
}
