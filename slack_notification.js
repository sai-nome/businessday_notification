 Slackに特定の日の通知を送る関数
function documentAlert() {
  const today = new Date();
   const today = new Date(20231222);  テスト用 

  const monthEnd5Date = getLastDateOfMonth(today);
  const monthEnd1Date = getLastDateOfMonth(today);
  const monthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);

  sendNotificationIfDue(today, monthEnd5Date, -6, today+、5営業日前になりました。見込み版勤怠の提出をお願いします。);
  sendNotificationIfDue(today, monthEnd1Date, -1, today+、最終営業日になりました。確定版勤怠の提出をお願いします。);
  sendNotificationIfDue(today, monthStartDate, 1, today+、第一営業日になりました。自社勤怠と交通費精算の提出をお願いします。);
}

 営業日計算関数
function dayCount(date, offsetDays) {
  let counter = 1;

  while (counter = Math.abs(offsetDays)) {
    if (!isHoliday_(date)) counter++;
    if (counter  Math.abs(offsetDays)) break;
    date.setDate(date.getDate() + Math.sign(offsetDays));
  }
  return date;
}

 Slackに通知を送る関数
function slackSend(message) {
  const webhookUrl = ワークスペースのWebhook URL;
  
  const payload = {
    text message
  };

  const options = {
    method post,
    muteHttpExceptions true,
    contentType applicationjson,
    payload JSON.stringify(payload)
  };

  UrlFetchApp.fetch(webhookUrl, options);
}

 休日か否かを判定する関数
function isHoliday_(date) {
  if (isWeekend(date)  isHolidayEvent(date)  isSpecialHoliday(date)) {
    return true;
  }
  return false;
}

 土日判定
function isWeekend(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0  dayOfWeek === 6;
}

 祝日イベント判定
function isHolidayEvent(date) {
  const calendarId = ja.japanese#holiday@group.v.calendar.google.com;
  const events = CalendarApp.getCalendarById(calendarId).getEventsForDay(date);
  return events.length  0;
}

 特定の休日判定
function isSpecialHoliday(date) {
  const specialHolidays = [0101, 0102, 0103, 1229, 1230, 1231];
  const formattedDate = Utilities.formatDate(date, JST, MMdd);
  return specialHolidays.includes(formattedDate);
}

 月末最終日を取得する関数
function getLastDateOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

 特定の日に通知を送るためのヘルパー関数
function sendNotificationIfDue(today, baseDate, offsetDays, message) {
  const targetDate = dayCount(baseDate, offsetDays);
  if (isSameDay(today, targetDate)) {
    slackSend(message);
  }
}

 二つの日付が同じ日か判定する関数
function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate();
}