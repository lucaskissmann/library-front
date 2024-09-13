"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { insertMaskInCpf } from "@/functions/cpf";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
import Image from "next/image";
 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve conter no mínimo 2 caracteres",
  }),
	age: z.coerce.number().nonnegative({
		message: "O ano de nascimento não deve ser negativo",
	}),
	cpf: z.string().min(1, {
		message: "O CPF deve ser inserido",
	}),
	gender: z.enum(["masculino", "feminino", "outros"]),
})

const FormAuthor = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
		defaultValues: {
      gender: "outros",
    },
  })

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
    try {
			const response = await axios.post(`${API_BASE_URL}/authors`, values);

			console.log("Sucesso: ", response.data);
			router.push("/admin/authors");
		toast.success("Autor criado com sucesso");
		} catch (error) {
			console.error("Erro ao enviar dados: ", error);
			toast.error("Erro ao cadastrar");
		}
  }

	return (
		<div className="mt-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome Completo</FormLabel>
								<FormControl>
									<Input placeholder="Digite o nome do autor" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Idade</FormLabel>
								<FormControl>
									<Input 
										type="number"
										placeholder="Digite a idade do autor" 
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="cpf"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CPF</FormLabel>
								<FormControl>
									<Input 
										placeholder="000.000.000-00" 
										{...field}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, ""); 
											field.onChange(insertMaskInCpf(value)); 
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gênero</FormLabel>
								<FormControl>
									<RadioGroup 
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="masculino" />
											</FormControl>
											<FormLabel className="font-normal">
												Masculino
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="feminino" />
											</FormControl>
											<FormLabel className="font-normal">
												Feminino
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="outros" />
											</FormControl>
											<FormLabel className="font-normal">Outro</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-2">
						<Button 
							variant="cancel"
							className="px-16 py-2"
							onClick={() => router.push("/admin/authors")}
						>
							Cancelar
						</Button>
						<Button 
							variant="confirm"
							type="submit"
							className="px-16 py-2"
						>
							Salvar
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default FormAuthor;