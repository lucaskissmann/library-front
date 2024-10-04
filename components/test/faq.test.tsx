import { render, screen, fireEvent } from "@testing-library/react";
import FAQ from "../faq";

describe("FAQ Component", () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it("should render the FAQ heading", () => {
    const heading = screen.getByText(/f.a.q/i);
    expect(heading).toBeInTheDocument();
  });

  it("should render all accordion items", () => {
    const questions = [
      "Em quais plataformas posso acessar a Book Club?",
      "Os livros são completos ou só resumos?",
      "Esqueci minha senha, como alterar?",
      "Como faço para cancelar o serviço?"
    ];

    questions.forEach(question => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

	it("should expand and collapse accordion items", () => {
		const question = screen.getByText(/Em quais plataformas posso acessar a Book Club?/i);
	
		expect(screen.queryByText(/A Book Club está disponível para download em smartphones*/i)).toBeNull();
	
		fireEvent.click(question);
	
		expect(screen.getByText(/A Book Club está disponível para download em smartphones*/i)).toBeVisible();
	
		fireEvent.click(question);
	
		expect(screen.queryByText(/A Book Club está disponível para download em smartphones*/i)).toBeNull();
	});

  it("should display the correct content for each question", () => {
    const question = screen.getByText(/Em quais plataformas posso acessar a Book Club?/i);
    fireEvent.click(question);

    const expectedContent = /A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android/i;

    expect(screen.getByText(expectedContent)).toBeVisible();

    const questionsWithExpectedContents = [
      {
        question: /Os livros são completos ou só resumos?/i,
        content: /A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android/i
      },
      {
        question: /Esqueci minha senha, como alterar?/i,
        content: /A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android/i
      },
      {
        question: /Como faço para cancelar o serviço?/i,
        content: /A Book Club está disponível para download em smartphones e tablets, tanto para sistemas operacionais iOS quanto Android/i
      }
    ];

    questionsWithExpectedContents.forEach(({ question, content }) => {
      fireEvent.click(screen.getByText(question));
      expect(screen.getByText(content)).toBeVisible();
      fireEvent.click(screen.getByText(question));
		});
	});
});
