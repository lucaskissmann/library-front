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
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Renter } from "@/types/Renter";
import { LocalizationProvider, DatePicker, DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MultiSelect from "./ui/multi-select";
import { Button } from "./ui/button";
import CategorySelect from "./category-selector";
import { MultiSelectAuthors } from "./ui/multi-select-authors";
import { insertMaskInCpf } from "@/functions/cpf";
import { insertMaskInPhone } from "@/functions/phone";
import { Gender } from "@/types/Author";
import { mapGender } from "@/functions/mapGender";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve conter no mínimo 2 caracteres",
  }),
	birthDate: z.date(),
	cpf: z.string().min(1, {
		message: "O CPF deve ser inserido",
	}),
	gender: z.enum(["masculino", "feminino", "outros"]).optional(),
  phone: z.string().min(1, {
    message: "O telefone deve ser inserido",
  }),
	email: z.
		string().
		email({
			message: "Insira um email válido",
		})
});

interface RenterFormProps {
  initialData?: Renter;
  onClose?: () => void;
  isEdit?: boolean;
}

const RenterForm: React.FC<RenterFormProps> = ({
  initialData,
  onClose,
  isEdit = false,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      birthDate: initialData?.birthDate ? dayjs(initialData.birthDate).toDate() : undefined,
      cpf: initialData?.cpf || "",
      gender: mapGender(initialData?.gender),
			phone: initialData?.phone || "",
			email: initialData?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
    };

		console.log(formattedValues);
    
    try {
      if (isEdit && initialData?.id) {
        await axios.put(`${API_BASE_URL}/renters/${initialData.id}`, formattedValues);
        toast.success("Locatário atualizado com sucesso");
        if (onClose) onClose();
      } else {
        await axios.post(`${API_BASE_URL}/renters`, formattedValues);
        toast.success("Locatário criado com sucesso");
        router.push("/admin/renters");
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
    router.push("/admin/renters");
  }

  function onErrors(e:any) {
    console.log("onErrors", e)
  }

  return (
    <Box className="mt-8 flex flex-col gap-4" component="form" onSubmit={form.handleSubmit(onSubmit, onErrors)}>
      <TextField
        label="Nome completo"
				required
        variant="outlined"
        fullWidth
        {...form.register("name")}
        error={!!form.formState.errors.name}
        helperText={form.formState.errors.name?.message}
      />
			<LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="birthDate"
          control={form.control}
          render={({ field }) => (
            <FormControl fullWidth error={!!form.formState.errors.birthDate}>
              <DateField 
								required
                label="Data de Nascimento"
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
				name="gender"
				control={form.control}
				render={({ field }) => (
					<FormControl>
						<FormLabel className=" text-black">Gênero</FormLabel>
						<RadioGroup
							onChange={field.onChange}
							aria-labelledby="demo-radio-buttons-group-label"
							// defaultValue={"outros"}
							value={field.value}
						>
							<FormControlLabel value="feminino" control={<Radio size="small" />} label="Feminino" />
							<FormControlLabel value="masculino" control={<Radio size="small" />} label="Masculino" />
							<FormControlLabel value="outros" control={<Radio size="small" />} label="Outros" />
						</RadioGroup>
					</FormControl>
				)}
			/>
			<h3 className="text-xl text-muted-foreground">Dados de contato:</h3>
			<TextField
				placeholder="Digite seu endereço de e-mail"
        label="Email"
				required
        variant="outlined"
        fullWidth
        {...form.register("email")}
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
      />
			<section className="flex gap-x-5">
				{!isEdit && (
					<Controller
						name="cpf"
						control={form.control}
						render={({ field }) => (
							<FormControl fullWidth error={!!form.formState.errors.cpf}>
								<TextField
									placeholder="000.000.000-00"
									label="CPF"
									required
									variant="outlined"
									slotProps={{htmlInput: {maxLength: 14}}}
									fullWidth
									{...field}
									error={!!form.formState.errors.cpf}
									helperText={form.formState.errors.cpf?.message}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, "");
										field.onChange(insertMaskInCpf(value));
									}}
								/>
							</FormControl>
						)}
					/>
				)}
				<Controller
					name="phone"
					control={form.control}
					render={({ field }) => (
						<FormControl fullWidth error={!!form.formState.errors.phone}>
							<TextField
								placeholder="(99) 99999-9999"
								required
								label="Telefone"
								variant="outlined"
								slotProps={{htmlInput: {maxLength: 15}}}
								fullWidth
								{...field}
								error={!!form.formState.errors.phone}
								helperText={form.formState.errors.phone?.message}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, "");
									field.onChange(insertMaskInPhone(value));
								}}
							/>
						</FormControl>
					)}
				/>
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

export default RenterForm;
