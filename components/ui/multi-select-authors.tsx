import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
	CommandList,
} from "@/components/ui/command";
import { XCircle, ChevronDown, XIcon, CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { Author } from "@/types/Author";

interface MultiSelectAuthorsProps {
  onValueChange: (value: number[]) => void;
  defaultValue?: number[];
  placeholder?: string;
  maxCount?: number;
}

export const MultiSelectAuthors: React.FC<MultiSelectAuthorsProps> = ({
  onValueChange,
  defaultValue = [],
  placeholder = "Selecione autores",
  maxCount = 1,
}) => {
  const [selectedValues, setSelectedValues] = React.useState<number[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
	const [authors, setAuthors] = useState<Author[]>([]);

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

  const toggleOption = (option: number) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className="w-full" variant="outline">
					<div className="flex  items-center">
						{selectedValues.length > 0 ? (
							<div className="flex items-center">
								{selectedValues.slice(0, maxCount).map((value) => {
									const option = authors.find((o) => o.id === value);
									return (
										<Badge key={value} className="m-1 bg-white text-black border border-solid border-zinc-500">
											{option?.name}
											<XCircle
												className="ml-2 h-4 w-4 cursor-pointer"
												onClick={(event) => {
													event.stopPropagation();
													toggleOption(value);
												}}
											/>
										</Badge>
									);
								})}
								{selectedValues.length > maxCount && (
									<Badge className="m-1">+ {selectedValues.length - maxCount}</Badge>
								)}
								<XIcon className="ml-2 h-4 w-4 cursor-pointer" onClick={handleClear} />
							</div>
						) : (
							<span className="flex text-muted-foreground font-normal">{placeholder}</span>
						)}
						<ChevronDown className="ml-2 h-4 w-4" />
					</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Procurar autores..." />
          <CommandList>
            <CommandEmpty>Nenhum autor encontrado.</CommandEmpty>
            <CommandGroup>
              {authors.map((author) => {
								const isSelected = selectedValues.includes(author.id);
								return (
                <CommandItem
                  key={author.id}
                  onSelect={() => toggleOption(author.id)}
                >
									<div
										className={cn(
											"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
											isSelected
												? "bg-primary text-primary-foreground"
												: "opacity-50 [&_svg]:invisible"
										)}
									>
										<CheckIcon className="h-4 w-4" />
									</div>
                  <span>{author.name}</span>
                </CommandItem>
								);
							})}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};