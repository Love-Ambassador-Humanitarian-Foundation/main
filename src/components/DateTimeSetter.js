import React, { useState } from 'react';
import { Input, DatePicker, TimePicker } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';


const convertUTCDateToLocalDate = (date) => {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
};

const formatDate = (date) => {
  const pad = (num) => {
    return num < 10 ? '0' + num : num;
  };
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const DateTimeInput = ({ defaultValue, onChange, disabled,date,time }) => {
  const [value, setValue] = useState(
    defaultValue
      ? formatDate(convertUTCDateToLocalDate(new Date(defaultValue)))
      : '2024-06-29 00:00:00'
  );
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-06-29');
  const [selectedTime, setSelectedTime] = useState('00:00:00'); // Set a default time

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setValue(`${dateString} ${selectedTime}`);
    setDateOpen(false);
    console.log(`${dateString} ${selectedTime}`);
    if (onChange) {
      onChange(`${dateString} ${selectedTime}`);
    }
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
    setValue(`${selectedDate} ${timeString}`);
    setTimeOpen(false);
    console.log(`${selectedDate} ${timeString}`);
    if (onChange) {
      onChange(`${selectedDate} ${timeString}`);
    }
  };

  const opendatepicker = () => {
    setTimeOpen(false);
    setDateOpen(!dateOpen);
  };

  const opentimepicker = () => {
    setDateOpen(false);
    setTimeOpen(!timeOpen);
  };

  return (
    <>
      <DatePicker
        //value={dayjs(selectedDate)}
        open={dateOpen}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        style={{ zIndex:'-9999', height:'0px'}}
        popupAlign={['top', 'left']}
      />
      <TimePicker
        //value={dayjs(selectedTime)}
        open={timeOpen}
        onChange={handleTimeChange}
        format="HH:mm:ss"
        style={{ zIndex:'-9999', height:'0px'}}
        popupAlign={['top', 'left']}
      />
      <Input
        value={value}
        suffix={
          <div>{date?<CalendarOutlined
            className="m-1 mr-1"
            style={{ cursor: 'pointer' }}
            onClick={opendatepicker}
            disabled={disabled ? true : false}
          />:null}
          {time?<ClockCircleOutlined
              className="m-2"
              style={{ cursor: 'pointer' }}
              onClick={opentimepicker}
              disabled={disabled ? true : false}
            />:null}
            
            
          </div>
        }
        //onChange={handleChange}
        readOnly={true}
        placeholder="YYYY-MM-DD HH:mm:ss"
        disabled={disabled ? true : false}
        className="p-0 px-2 border-0"
        style={{ backgroundColor: 'whitesmoke' }}
      />
    </>
  );
};

export default DateTimeInput;
