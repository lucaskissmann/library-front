"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LocalizationProvider, DatePicker, DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from "./ui/button";
import { MultiSelectAuthors } from "./ui/multi-select-authors";
import { Rental } from "@/types/Rental";
import MultiSelectBooks from "./ui/multi-select-books";
import RenterSelector from "./renter-selector";

const formSchema = z.object({
  renterId: z.number({required_error: "Selecione um locatário."}).min(1, "Selecione um locatário."),
  bookIds: z
    .array(z.number().min(1))
    .min(1, "Selecione pelo menos um livro."),
  rentalDate: z.date().optional(),
  returnDate: z.date().optional(),
});

interface RentalFormProps {
  initialData?: Rental;
  onClose?: () => void;
  isEdit?: boolean;
}

const RentalForm: React.FC<RentalFormProps> = ({
  initialData,
  onClose,
  isEdit = false,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      renterId: initialData?.renter.id,
      bookIds: initialData?.books?.map(book => book.id) || [],
      rentalDate: initialData?.rentalDate ? dayjs(initialData.rentalDate).toDate() : undefined,
      returnDate: initialData?.returnDate ? dayjs(initialData.returnDate).toDate() : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues: any = { ...values };

    if (values.rentalDate) {
      formattedValues.rentalDate = dayjs(values.rentalDate).format("YYYY-MM-DD");
    } else {
      delete formattedValues.rentalDate; 
    }

    if (values.returnDate) {
      formattedValues.returnDate = dayjs(values.returnDate).format("YYYY-MM-DD");
    } else {
      delete formattedValues.returnDate;
    }

    console.log(formattedValues);
    
    try {
      if (isEdit && initialData?.id) {
        await axios.put(`${API_BASE_URL}/rentals/${initialData.id}`, formattedValues);
        toast.success("Aluguel atualizado com sucesso");
        if (onClose) onClose();
      } else {
        await axios.post(`${API_BASE_URL}/rentals`, formattedValues);
        toast.success("Aluguel criado com sucesso");
        router.push("/admin/rentals");
      }
      router.refresh();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao enviar dados";
      toast.error(errorMessage);
    }
  }

  function handleCancel(event: React.MouseEvent) {
    event.preventDefault();
    if (onClose) onClose();
    router.push("/admin/rentals");
  }

  function onErrors(e:any) {
    console.log("onErrors", e)
  }

  return (
    <Box className="mt-8 flex flex-col gap-4" component="form" onSubmit={form.handleSubmit(onSubmit, onErrors)}>
      <Controller
        name="bookIds"
        control={form.control}
        render={({ field }) => (
          <>
          { isEdit ? (
             <FormControl fullWidth error={!!form.formState.errors.bookIds}>
              <MultiSelectAuthors
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder="Selecione os livros"
              />
              <FormHelperText>{form.formState.errors.bookIds?.message}</FormHelperText>
            </FormControl>
          ) : (
            <FormControl fullWidth error={!!form.formState.errors.bookIds}>
            <MultiSelectBooks
              onChange={field.onChange} 
              defaultValue={field.value}
            />
            <FormHelperText>{form.formState.errors.bookIds?.message}</FormHelperText>
            </FormControl>
          )}
          </>
        )}
      />
      <Controller
        name="renterId"
        control={form.control}
        render={({ field }) => (
          <FormControl fullWidth error={!!form.formState.errors.renterId}>
            <RenterSelector 
              defaultValue={field.value}
              onChange={field.onChange}
            />
            <FormHelperText>{form.formState.errors.renterId?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <section className="flex gap-1">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="rentalDate"
            control={form.control}
            render={({ field }) => (
              <FormControl fullWidth error={!!form.formState.errors.rentalDate}>
                <DateField 
                  label="Data de Retirada"
                  defaultValue={dayjs(new Date())}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="returnDate"
            control={form.control}
            render={({ field }) => (
              <FormControl fullWidth error={!!form.formState.errors.returnDate}>
                <DateField 
                  label="Data de Devolução"
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
      </section>
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

export default RentalForm;
