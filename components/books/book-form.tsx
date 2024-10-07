"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Book, BookState, Category } from "@/types/Book";
import { Author } from "@/types/Author";
import { useEffect, useState } from "react";
import { MultiSelectAuthors } from "../ui/multi-select-authors";
import { Select } from "../ui/select";
import CategorySelect from "./category-selector";
import { DatePickerComponent } from "../ui/date-picker";
import { format } from "date-fns";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve conter no mínimo 2 caracteres",
  }),
  category: z.enum(Object.values(Category) as [Category, ...Category[]]),
  isbn: z.coerce.string(),
  publicationDate: z.date(),
  authorIds:  z
  .array(z.number().min(1))
  .min(1, "Selecione pelo menos um autor."),
});

interface BookFormProps {
  initialData?: Book;
  onClose?: () => void;
  isEdit?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onClose,
  isEdit = false
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category,
      isbn: initialData?.isbn,
      publicationDate: initialData?.publicationDate,
      authorIds: initialData?.authors?.map(author => author.id) || [], 
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(form.formState.errors);

    console.log("valores: ", values);
    
    // try {
    //   if (isEdit && initialData?.id) {
    //     const response = await axios.put(`${API_BASE_URL}/books/${initialData.id}`, values);
    //     console.log("Sucesso: ", response.data);
    //     toast.success("Livro atualizado com sucesso");
		// 		if(onClose) {
		// 			onClose();
		// 		}
    //   } else {
    //     const response = await axios.post(`${API_BASE_URL}/books`, values);
    //     console.log("Sucesso: ", response.data);
    //     toast.success("Livro criado com sucesso");
		// 		router.push("/admin/books");
    //   }

    //   router.refresh();

    // } catch (error: any) {
    //   const errorMessage = error.response?.data?.message || "Erro ao enviar dados";
    //   console.error("Erro ao enviar dados: ", errorMessage);
    //   toast.error(errorMessage);
    // }
  }

  function handleCancel(event: React.MouseEvent) {
    event.preventDefault();
    if(onClose) {
      onClose();
    }

    router.push("/admin/books");
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título do livro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o ISBN do livro"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Publicação</FormLabel>
                <FormControl>
                  <DatePickerComponent
                    selected={field.value}
                    onSelect={(date) => field.onChange(date ? format(date, "yyyy/MM/dd") : "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
					<FormField
						control={form.control}
						name="authorIds"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Autores</FormLabel>
								<FormControl>
                  <MultiSelectAuthors
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Selecione os autores"
                  />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> 
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <CategorySelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
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
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
