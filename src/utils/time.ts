//封装函数获取当前时间返回结果早上|上午|下午|晚上
export const getCurrentTime = () => {
  let message = "";
  let hour = new Date().getHours();
  if(hour <= 8){
    message = '早上'
  } else if(hour <= 14){
    message = '上午'
  } else if(hour <= 18){
    message = '下午'
  } else{
    message = '晚上'
  }

  return message;
}