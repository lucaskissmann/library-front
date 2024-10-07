import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
	return (
		<>
			<h1 className="mb-8 mt-20 text-4xl font-extralight">F.A.Q.</h1>
			<Accordion type="single" collapsible className="w-full bg-white px-4 border border-solid border-black border-opacity-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Em quais plataformas posso acessar a Book Club?</AccordionTrigger>
        <AccordionContent>
				A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android, basta acessar a App Store ou Google Play Store e baixar o aplicativo. Você também pode acessar a Book Club diretamente pelo navegador em seu computador, seja ele Windows, macOS ou Linux, permitindo que você leia seus eBooks favoritos sem a necessidade de um dispositivo móvel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Os livros são completos ou só resumos?</AccordionTrigger>
        <AccordionContent>
				A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android, basta acessar a App Store ou Google Play Store e baixar o aplicativo. Você também pode acessar a Book Club diretamente pelo navegador em seu computador, seja ele Windows, macOS ou Linux, permitindo que você leia seus eBooks favoritos sem a necessidade de um dispositivo móvel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Esqueci minha senha, como alterar?</AccordionTrigger>
        <AccordionContent>
          A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android, basta acessar a App Store ou Google Play Store e baixar o aplicativo. Você também pode acessar a Book Club diretamente pelo navegador em seu computador, seja ele Windows, macOS ou Linux, permitindo que você leia seus eBooks favoritos sem a necessidade de um dispositivo móvel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Como faço para cancelar o serviço?</AccordionTrigger>
        <AccordionContent>
          A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android, basta acessar a App Store ou Google Play Store e baixar o aplicativo. Você também pode acessar a Book Club diretamente pelo navegador em seu computador, seja ele Windows, macOS ou Linux, permitindo que você leia seus eBooks favoritos sem a necessidade de um dispositivo móvel.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
		</>
	);
}

export default FAQ;