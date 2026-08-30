import uvicorn

def main():
    print("🚀 Launching AI Candidate Assistant Server on http://127.0.0.1:8000...")
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    main()
