"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Book, Category } from "@/types/Book";
import { LocalizationProvider, DatePicker, DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MultiSelect from "../ui/multi-select-authors-ui";
import { Button } from "../ui/button";
import CategorySelect from "./category-selector";
import { MultiSelectAuthors } from "../ui/multi-select-authors";
import MultiSelectAuthorsUI from "../ui/multi-select-authors-ui";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve conter no mínimo 2 caracteres",
  }),
  category: z.enum(Object.values(Category) as [Category, ...Category[]], {required_error: "Selecione uma categoria" }),
  isbn: z.string().min(1, {
    message: "O ISBN é obrigatório",
  }),
  publicationDate: z.date(),
  authorIds: z
    .array(z.number().min(1))
    .min(1, "Selecione pelo menos um autor."),
});

interface BookFormProps {
  initialData?: Book;
  onClose?: () => void;
  isEdit?: boolean;
}

const BookUiForm: React.FC<BookFormProps> = ({
  initialData,
  onClose,
  isEdit = false,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category,
      isbn: initialData?.isbn || "",
      publicationDate: initialData?.publicationDate ? dayjs(initialData.publicationDate).toDate() : undefined,
      authorIds: initialData?.authors?.map((author) => author.id) || [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      publicationDate: dayjs(values.publicationDate).format("YYYY-MM-DD"),
    };
    
    try {
      if (isEdit && initialData?.id) {
        await axios.put(`${API_BASE_URL}/books/${initialData.id}`, formattedValues);
        toast.success("Livro atualizado com sucesso");
        if (onClose) onClose();
      } else {
        await axios.post(`${API_BASE_URL}/books`, formattedValues);
        toast.success("Livro criado com sucesso");
        router.push("/admin/books");
      }
      router.refresh();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao enviar dados";
      toast.error(errorMessage);
    }
  }

  function handleCancel(event: React.MouseEvent) {
    console.log("cancelado")
    event.preventDefault();
    if (onClose) onClose();
    router.push("/admin/books");
  }

  function onErrors(e:any) {
    console.log("onErrors", e)
  }

  return (
    <Box className="mt-8 flex flex-col gap-4" component="form" onSubmit={form.handleSubmit(onSubmit, onErrors)}>
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        {...form.register("title")}
        error={!!form.formState.errors.title}
        helperText={form.formState.errors.title?.message}
      />
      <TextField
        label="ISBN"
        variant="outlined"
        type="number"
        fullWidth
        {...form.register("isbn")}
        error={!!form.formState.errors.isbn}
        helperText={form.formState.errors.isbn?.message}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="publicationDate"
          control={form.control}
          render={({ field }) => (
            <FormControl fullWidth error={!!form.formState.errors.publicationDate}>
              <DateField 
                label="Data de Publicação"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date: Dayjs | null) => {
                  field.onChange(date ? date.toDate() : null);
                }}
                format="DD-MM-YYYY"
              />
            </FormControl>
          )}
        />
      </LocalizationProvider>
      <Controller
          name="authorIds"
          control={form.control}
          render={({ field }) => (
        <FormControl fullWidth error={!!form.formState.errors.authorIds}>
          { isEdit ? (
            <MultiSelectAuthors
              onValueChange={field.onChange}
              defaultValue={field.value}
              placeholder="Selecione os autores"
            />
          ) : (
            <MultiSelectAuthorsUI
              onChange={field.onChange} 
              defaultValue={field.value}
            />
          )}
          <FormHelperText>{form.formState.errors.authorIds?.message}</FormHelperText>
        </FormControl>
        )}
      />
      <Controller
        name="category"
        control={form.control}
        render={({ field }) => (
          <>
          { isEdit ? (
            <FormControl fullWidth error={!!form.formState.errors.category} className="flex justify-center">
              <CategorySelect value={field.value} onChange={field.onChange} />
              <FormHelperText>{form.formState.errors.category?.message}</FormHelperText>
            </FormControl>
            ) : (
              <FormControl fullWidth error={!!form.formState.errors.category} className="flex justify-center">
                <InputLabel id="categoria-id" htmlFor="category-select">Categoria</InputLabel>
                <Select
                  labelId="categoria-id"
                  aria-label="categoria"
                  id="category-select"
                  defaultValue={initialData?.category || ""}
                  {...field}
                  label="Categoria"
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
                  {Object.values(Category).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{form.formState.errors.category?.message}</FormHelperText>
              </FormControl>
            ) 
          }
          </>
        )}
      />
      <div className={`flex gap-2 ${isEdit ? 'justify-center': ''}`}>
        <Button variant="cancel" className="px-16 py-2" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="confirm" type="submit" className="px-16 py-2">
          {isEdit ? "Atualizar" : "Salvar"}
        </Button>
      </div>
    </Box>
  );
};

export default BookUiForm;
