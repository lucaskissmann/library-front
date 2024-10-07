import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import AuthorForm from "../authors/author-form";
import { Author } from "@/types/Author";

interface UpdateDialogProps {
	data: Author;
	onClose: () => void;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ data, onClose }) => {
	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Autor</DialogTitle>
					<DialogDescription>
						Você está editando o autor: {data.name}
					</DialogDescription>
				</DialogHeader>
				<AuthorForm initialData={data} onClose={onClose} isEdit={true} />
			</DialogContent>
		</Dialog>
	);
}

export default UpdateDialog;