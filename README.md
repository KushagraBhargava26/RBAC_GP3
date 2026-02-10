# Enterprise RBAC Chatbot

A secure internal chatbot system with Role-Based Access Control (RBAC) and Retrieval-Augmented Generation (RAG).

## 🚀 Setup & Installation

1.  **Clone / Folder Setup**:
    Ensure you are in the root directory `rbac-system`.

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Data Processing (Week 1 & 2)**:
    Parse documents and assign metadata roles.
    ```bash
    python "week 2/src/chunking.py"
    python "week 2/src/parse_markdown.py"
    python "week 2/src/parse_csv.py"
    python "week 2/src/text_cleaning.py"
    python "week 2/src/metadata_tagging.py"
    ```

4.  **Vector DB (Week 3)**:
    Generate embeddings and index them.
    ```bash
    python "week 3/src/embeddings.py"
    python "week 3/src/index_embeddings.py"
    ```

5.  **Run Backend (Week 5)**:
    Start the FastAPI server.
    ```bash
    python "week 5/src/main.py"
    ```
    API will run at `http://127.0.0.1:8000`.
    Docs at `http://127.0.0.1:8000/docs`.

## 🤖 Local LLM Setup (Ollama)

This project uses **Ollama** to run a local LLM for AI-powered responses. No API key needed!

### Step 1: Install Ollama

**Windows:**
1. Download from: https://ollama.com/download
2. Run the installer (`OllamaSetup.exe`)
3. Restart your terminal after installation

**macOS/Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Step 2: Download the Model

Open a terminal and run:
```bash
ollama pull llama3.2:3b
```

This downloads the **Llama 3.2 3B** model (~2GB). Other recommended models:
- `llama3.2:1b` - Smaller, faster (~1.3GB)
- `phi3:mini` - Microsoft's efficient model (~2.3GB)
- `mistral:7b` - More powerful but larger (~4GB)

### Step 3: Start Ollama Server

Ollama usually runs automatically as a service. To verify:
```bash
ollama list
```

### Step 4: Configure the Application

Create/update `.env` file in the project root:
```env
LLM_API_KEY=ollama
LLM_BASE_URL=http://localhost:11434/v1
LLM_MODEL=llama3.2:3b
```

### Step 5: Start the Application

```bash
# Terminal 1: Backend
python "week 5/src/main.py"

# Terminal 2: Frontend
cd rbac-frontend
npm run dev
```

### Troubleshooting

- **Ollama not found**: Restart your terminal or add Ollama to PATH
- **Model not loading**: Run `ollama serve` manually
- **Slow responses**: Try a smaller model like `llama3.2:1b`

## 🧪 Testing

- **RBAC Tests**: `python "week 4/tests/rbac_tests.py"`
- **Search Benchmark**: `python "week 4/tests/benchmark.py"`

## 👤 Default Users (Seeded)

| Username | Password | Role | Access |
|---|---|---|---|
| `admin` | `admin123` | `c-level` | All Departments |
| `finance_user` | `pass123` | `finance` | Finance + General |
| `hr_user` | `pass123` | `hr` | HR + General |
| `marketing_user` | `pass123` | `marketing` | Marketing + General |
| `eng_user` | `pass123` | `engineering` | Engineering + General |
| `employee` | `pass123` | `employees` | General Only |

## 🏗 Architecture
- **Preprocessing**: LangChain + TikToken
- **Embeddings**: Sentence-Transformers (`all-MiniLM-L6-v2`)
- **Vector DB**: ChromaDB
- **Backend**: FastAPI + SQLite + JWT
- **RBAC**: Custom Middleware + Metadata Filtering
