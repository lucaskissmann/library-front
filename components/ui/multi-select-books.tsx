
import { API_BASE_URL } from "@/config";
import { Book } from "@/types/Book";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface MultiSelectBooks {
  onChange: (selectedBooks: number[]) => void;
  defaultValue?: number[];
}

const MultiSelectBooks: React.FC<MultiSelectBooks> = ({
	onChange, 
	defaultValue = [] 
}) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [selectedBooks, setSelectedBooks] = useState<number[]>(defaultValue);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await axios.get<Book[]>(`${API_BASE_URL}/books?state=AVAILABLE`);
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros: ", error);
      }
    }

    fetchAuthors();
  }, []);

	useEffect(() => {
    setSelectedBooks(defaultValue); 
		console.log(defaultValue);
  }, [defaultValue]);

	const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const newSelectedValues = typeof value === "string" ? value.split(",").map(Number) : value;
    setSelectedBooks(newSelectedValues);
    onChange(newSelectedValues);
  };

	return (
		<FormControl className="relative z-50 w-full">
			<InputLabel id="books-id">Livros</InputLabel>
			<Select
        data-testid="book-combobox"
        labelId="books-id"
				multiple
				value={selectedBooks}
				onChange={handleChange}
				input={<OutlinedInput label="Livros" />}
				renderValue={(selected) =>
					selected
						.map((id) => {
							const book = books.find((book) => book.id === id);
							return book ? book.title : id;
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
				{books.map((book) => (
					<MenuItem key={book.id} value={book.id}>
						<Checkbox checked={selectedBooks.includes(book.id)} />
						<ListItemText primary={book.title} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
  );
}

export default MultiSelectBooks;