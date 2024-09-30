import { API_BASE_URL } from "@/config";
import { Renter } from "@/types/Renter";
import { InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface RenterSelectorProps {
  defaultValue: number;
  onChange: (selectedRenter: number) => void;
}

const RenterSelector: React.FC<RenterSelectorProps> = ({
  defaultValue,
  onChange 
}) => {
  const [renters, setRenters] = useState<Renter[]>([]);
  const [selectedRenter, setSelectedRenter] = useState<number>(defaultValue);

  useEffect(() => {
    const fetchRenters = async () => {
      try {
        const response = await axios.get<Renter[]>(`${API_BASE_URL}/renters`);
        setRenters(response.data); 
      } catch (error) {
        console.error("Erro ao buscar os locatários:", error);
      }
    };

    fetchRenters();
  }, []);

  useEffect(() => {
    setSelectedRenter(defaultValue); 
		console.log(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;

    setSelectedRenter(Number(value));
    onChange(Number(value));
  };

  return (
    <>
      <InputLabel id="renter-select-label">Locatário</InputLabel>
      <Select
        labelId="renter-select-label"
        defaultValue={defaultValue}
        label="Locatário"
        value={selectedRenter}
        onChange={handleChange}
        input={<OutlinedInput label="Locatário" />}
        MenuProps={{
          disablePortal: true,
          PaperProps: {
            className: "absolute z-50 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow-lg"
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
      >
        {renters.map((renter) => (
          <MenuItem key={renter.id} value={renter.id}>
            {renter.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default RenterSelector;