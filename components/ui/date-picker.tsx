import { format, parse } from "date-fns";
import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selected?: string;
  onSelect: (date: Date | null) => void;
}

export function DatePickerComponent({ selected, onSelect }: DatePickerProps) {
  const parsedDate = selected ? parse(selected, "yyyy/MM/dd", new Date()) : null;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "yyyy/MM/dd");
      console.log("Data formatada para o backend:", formattedDate);
      onSelect(date);
    } else {
      onSelect(null);
    }
  };

  return (
    <div>
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select" // Isso permite a seleção de ano/mês de forma rápida
        className="w-[280px] border p-2"
        placeholderText="Selecione uma Data"
        onKeyDown={(e) => e.preventDefault()} 
      />
    </div>
  );
}
