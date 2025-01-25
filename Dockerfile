
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# for the pytoch installation
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

#dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


RUN pip install torch

# Copy the backend code
COPY . .

#  the port the app runs on
EXPOSE 8000

# Command to run 
CMD ["uvicorn", "mode_fastapi:app", "--host", "0.0.0.0", "--port", "8000"]