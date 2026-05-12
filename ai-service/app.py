from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
from dotenv import load_dotenv
from itertools import combinations

load_dotenv()

app = FastAPI(title="AI Drug Interaction Checker")

# ------------------ CORS ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Load CSV ------------------
CSV_PATH = os.getenv("CSV_DATA_PATH", "./data/drug_interactions.csv")

drug_interactions_df = None
interaction_lookup = {}

def load_data():
    global drug_interactions_df, interaction_lookup

    try:
        df = pd.read_csv(CSV_PATH)

        # Normalize text
        df['drug1'] = df['drug1'].str.lower().str.strip()
        df['drug2'] = df['drug2'].str.lower().str.strip()

        drug_interactions_df = df

        # 🔥 Build fast lookup dictionary
        interaction_lookup = {}

        for _, row in df.iterrows():
            key1 = (row['drug1'], row['drug2'])
            key2 = (row['drug2'], row['drug1'])  # reverse

            interaction_lookup[key1] = row
            interaction_lookup[key2] = row

        print(f"✅ Loaded {len(df)} interactions")

    except Exception as e:
        print(f"❌ Failed to load CSV: {e}")
        drug_interactions_df = None
        interaction_lookup = {}

# Load at startup
load_data()

# ------------------ Models ------------------
class DrugCheckRequest(BaseModel):
    medicines: list[str]


class DrugInteraction(BaseModel):
    drug1: str
    drug2: str
    severity: str
    description: str
    recommendation: str


class InteractionResponse(BaseModel):
    interactions: list[DrugInteraction]


# ------------------ Health ------------------
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "drug-interaction-checker"}


# ------------------ Check Interactions ------------------
@app.post("/api/check-interactions", response_model=InteractionResponse)
async def check_interactions(request: DrugCheckRequest):

    if drug_interactions_df is None or drug_interactions_df.empty:
        raise HTTPException(status_code=500, detail="Drug data not loaded")

    medicines = list(set([m.lower().strip() for m in request.medicines]))

    interactions = []

    # 🔥 Efficient pair generation
    for drug1, drug2 in combinations(medicines, 2):
        key = (drug1, drug2)

        if key in interaction_lookup:
            row = interaction_lookup[key]

            interactions.append(
                DrugInteraction(
                    drug1=row['drug1'],
                    drug2=row['drug2'],
                    severity=row['severity'],
                    description=row['description'],
                    recommendation=row['recommendation'],
                )
            )

    return InteractionResponse(interactions=interactions)


# ------------------ Get All Drugs ------------------
@app.get("/api/drugs")
async def get_all_drugs():

    if drug_interactions_df is None or drug_interactions_df.empty:
        raise HTTPException(status_code=500, detail="Drug data not loaded")

    drugs = set()

    drugs.update(drug_interactions_df['drug1'].unique())
    drugs.update(drug_interactions_df['drug2'].unique())

    return {"drugs": sorted(drugs)}


# ------------------ Get Interactions for One Drug ------------------
@app.get("/api/interactions/{drug_name}")
async def get_drug_interactions(drug_name: str):

    if drug_interactions_df is None or drug_interactions_df.empty:
        raise HTTPException(status_code=500, detail="Drug data not loaded")

    drug_name = drug_name.lower().strip()

    interactions = []

    for (d1, d2), row in interaction_lookup.items():
        if drug_name in (d1, d2):
            interactions.append({
                "drug1": row['drug1'],
                "drug2": row['drug2'],
                "severity": row['severity'],
                "description": row['description'],
                "recommendation": row['recommendation'],
            })

    return {"drug": drug_name, "interactions": interactions}


# ------------------ Reload Data (Optional Dev API) ------------------
@app.post("/api/reload")
async def reload_data():
    load_data()
    return {"message": "Data reloaded successfully"}


# ------------------ Run ------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
