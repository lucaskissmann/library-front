import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/config";
import { Rental } from "@/types/Rental";
import axios from "axios";
import RentalDetailsClient from "./components/rental-details-client";

interface RentalDetailsPageProps {
  params: {
    rentalId: string;
  };
}

const fetchRentalDetails = async (rentalId: string): Promise<Rental | null> => {
  try {
    const response = await axios.get<Rental>(`${API_BASE_URL}/rentals/${rentalId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar a busca:", error);
    return null;
  }
};

const RentalDetailsPage = async ({ params }: RentalDetailsPageProps) => {
  const rental = await fetchRentalDetails(params.rentalId);

  if (!rental) {
    return (
      <div>
        <h1>Erro</h1>
        <p>Não foi possível carregar os detalhes do aluguel.</p>
      </div>
    );
  }

	const tableData = rental.books.map((book) => ({
    id: book.id,
    rentalId: rental.id,
    rentalDate: rental.rentalDate,
    returnDate: rental.returnDate,
    isReturned: rental.isReturned,
    bookTitle: book.title, 
		bookState: book.state,
  }));

  return (
    <div>
      <div className="mx-20 mt-16">
        <h1 className="text-4xl">Detalhes ID: {rental.id}</h1>
        <Separator className="my-4"/>
        <RentalDetailsClient tableData={tableData} rentalId={rental.id} />
			</div>
		</div>
  );
};

export default RentalDetailsPage;
