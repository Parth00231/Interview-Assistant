# 🤖 AI Candidate Interview Assistant

An AI-powered candidate interview system built with **FastAPI**, **Groq LLM (OpenAI / LLaMA Models)**, **PyPDF**, **Pydantic**, and a sleek **Glassmorphic Web Interface**.

The application parses candidate resume PDFs, extracts structured details into strict Pydantic schemas, and provides a professional AI chatbot persona to answer HR interview questions based strictly on verified resume facts without hallucination.

---

## ✨ Features

- 📄 **Automatic PDF Resume Parsing**: Reads candidate resume PDFs and extracts experience, skills, education, projects, and certifications using structured Pydantic models.
- 💬 **Interactive HR Interview Chatbot**: Chat persona representing the candidate (Parth Rastogi) to answer technical, experience, and background questions.
- 🛡️ **Zero Hallucination Rules**: Programmed with strict prompt constraints to only state information explicitly present in the resume.
- 🎨 **Modern Dark Mode UI**: Built with responsive HTML5, CSS3 glassmorphism, FontAwesome icons, Markdown rendering, and quick HR question prompt chips.
- ⚡ **FastAPI & Groq Engine**: Powered by Groq's high-speed inference engine for near-instant responses.

---

## 📁 Repository Structure

```text
Mini_project2/
├── backend/
│   ├── main.py                     # FastAPI application & Groq integration
│   └── Parth_Rastogi_Resume(PDF).pdf# Candidate resume PDF
├── frontend/
│   ├── index.html                  # Responsive Web UI
│   ├── style.css                   # Glassmorphism dark mode styles
│   └── app.js                      # Chat interaction logic & API caller
├── .env.example                    # Environment variable template
├── .gitignore                      # Git exclusion file
├── main.py                         # Root entrypoint launcher
├── pyproject.toml                  # Project configuration & dependencies
├── README.md                       # Project documentation
└── uv.lock                         # UV package lock file
```

---

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.10+ installed
- A [Groq API Key](https://console.groq.com/)

### 2. Environment Setup

Clone the repository and create a `.env` file in the project root:

```bash
cp .env.example .env
```

Open `.env` and add your Groq API Key:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 3. Installation

#### Using `uv` (Recommended)
```bash
uv sync
```

#### Or using standard `pip`
```bash
pip install -r pyproject.toml
```

### 4. Running the Application

You can launch the application using the root launcher script:

```bash
uv run python main.py
```

Or using `uvicorn` directly:

```bash
uv run uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

Then open your browser and navigate to:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Serves the Interactive Web App UI |
| `POST` | `/chat` | Chat endpoint receiving `{"question": "..."}` and returning JSON `{"answer": "..."}` |
| `GET` | `/docs` | Interactive Swagger API Documentation |

---

## 📄 License

MIT License
