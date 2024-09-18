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
import { DatePicker } from "./ui/date-picker";
import { useEffect, useState } from "react";
import MultiSelectAuthors from "./ui/multi-select-authors";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve conter no mínimo 2 caracteres",
  }),
  category: z.enum(Object.values(Category) as [Category, ...Category[]]),
  isbn: z.coerce.string(),
  publicationDate: z.date(),
  authors: z.array(z.string())
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category,
      isbn: initialData?.isbn,
      authors: initialData?.authors.map(author => author.id) || [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("valores: ", values)
    
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
          <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Publicação</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
					{/* <FormField
						control={form.control}
						name="authors"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Autores</FormLabel>
								<FormControl>
                  <MultiSelectAuthors 
                    value={field.value || []}
                    onChange={(selected) => field.onChange(selected)}  
                  />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>  */}
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
