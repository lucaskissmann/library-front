import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Author } from "@/types/Author";
import { API_BASE_URL } from "@/config";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface MultiSelectProps {
  value: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelectAuthors: React.FC<MultiSelectProps> = ({ value, onChange }) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await axios.get(`${API_BASE_URL}/authors`);
        setAuthors(response.data);
      } catch (error) {
        console.error("Erro ao buscar autores: ", error);
      }
    }

    fetchAuthors();
  }, []);

  const handleToggle = (authorId: string) => {
    if (value.includes(authorId)) {
      onChange(value.filter((id) => id !== authorId)); 
    } else {
      onChange([...value, authorId]); 
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {value.length > 0 ? `${value.length} autores selecionados` : "Selecione autores"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2">
          {authors.map((author) => (
            <FormItem key={author.id} className="flex items-center">
              <Checkbox
                checked={value.includes(author.id)}
                onCheckedChange={() => handleToggle(author.id)}
              />
              <FormLabel className="ml-2">{author.name}</FormLabel>
            </FormItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectAuthors;
