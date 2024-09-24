
import { API_BASE_URL } from "@/config";
import { Author } from "@/types/Author";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface MultiSelectProps {
  onChange: (selectedAuthors: number[]) => void;
  defaultValue?: number[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({
	onChange, 
	defaultValue = [] 
}) => {
	const [authors, setAuthors] = useState<Author[]>([]);
	const [selectedAuthors, setSelectedAuthors] = useState<number[]>(defaultValue);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await axios.get<Author[]>(`${API_BASE_URL}/authors`);
        setAuthors(response.data);
      } catch (error) {
        console.error("Erro ao buscar autores: ", error);
      }
    }

    fetchAuthors();
  }, []);

	useEffect(() => {
    setSelectedAuthors(defaultValue); 
		console.log(defaultValue);
  }, [defaultValue]);

	const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const newSelectedValues = typeof value === "string" ? value.split(",").map(Number) : value;
    setSelectedAuthors(newSelectedValues);
    onChange(newSelectedValues);
  };

	return (
		<FormControl className="relative z-50 w-full">
			<InputLabel id="demo-multiple-checkbox-label">Autores</InputLabel>
			<Select
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				multiple
				value={selectedAuthors}
				onChange={handleChange}
				input={<OutlinedInput label="Autores" />}
				renderValue={(selected) =>
					selected
						.map((id) => {
							const author = authors.find((author) => author.id === id);
							return author ? author.name : id;
						})
						.join(', ')
				}
				MenuProps={{
          disablePortal: true,
          PaperProps: {
            className: "max-h-60 overflow-auto z-50", 
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
				{authors.map((author) => (
					<MenuItem key={author.id} value={author.id}>
						<Checkbox checked={selectedAuthors.includes(author.id)} />
						<ListItemText primary={author.name} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
  );
}

export default MultiSelect;