# from fastapi import FastAPI, HTTPException
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pandas as pd
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# # CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load drug interactions data
# CSV_PATH = os.getenv("CSV_DATA_PATH", "./data/drug_interactions.csv")
# drug_interactions_df = None

# try:
#     drug_interactions_df = pd.read_csv(CSV_PATH)
#     drug_interactions_df['drug1'] = drug_interactions_df['drug1'].str.lower()
#     drug_interactions_df['drug2'] = drug_interactions_df['drug2'].str.lower()
# except Exception as e:
#     print(f"Error loading CSV: {e}")


# class DrugCheckRequest(BaseModel):
#     medicines: list[str]


# class DrugInteraction(BaseModel):
#     drug1: str
#     drug2: str
#     severity: str
#     description: str
#     recommendation: str


# class InteractionResponse(BaseModel):
#     interactions: list[DrugInteraction]


# @app.get("/api/health")
# async def health_check():
#     """Health check endpoint"""
#     return {"status": "ok", "service": "drug-interaction-checker"}


# @app.post("/api/check-interactions", response_model=InteractionResponse)
# async def check_interactions(request: DrugCheckRequest):
#     """
#     Check drug interactions for a list of medicines
#     """
#     if drug_interactions_df is None or drug_interactions_df.empty:
#     raise HTTPException(status_code=500, detail="Drug data not loaded")

#     medicines = [m.lower() for m in request.medicines]
#     interactions = []

#     # Check all combinations of medicines
#     for i in range(len(medicines)):
#         for j in range(i + 1, len(medicines)):
#             drug1 = medicines[i]
#             drug2 = medicines[j]

#             # Check for interactions in both directions
#             interaction = drug_interactions_df[
#                 ((drug_interactions_df['drug1'] == drug1) & (drug_interactions_df['drug2'] == drug2)) |
#                 ((drug_interactions_df['drug1'] == drug2) & (drug_interactions_df['drug2'] == drug1))
#             ]

#             if not interaction.empty:
#                 row = interaction.iloc[0]
#                 interactions.append(
#                     DrugInteraction(
#                         drug1=row['drug1'],
#                         drug2=row['drug2'],
#                         severity=row['severity'],
#                         description=row['description'],
#                         recommendation=row['recommendation'],
#                     )
#                 )

#     return InteractionResponse(interactions=interactions)


# @app.get("/api/drugs")
# async def get_all_drugs():
#     """Get all available drugs"""
#     if not drug_interactions_df:
#         raise HTTPException(status_code=500, detail="Drug data not loaded")

#     drugs = []
#     for drug in drug_interactions_df['drug1'].unique():
#         if drug not in drugs:
#             drugs.append(drug)
#     for drug in drug_interactions_df['drug2'].unique():
#         if drug not in drugs:
#             drugs.append(drug)

#     return {"drugs": sorted(drugs)}


# @app.get("/api/interactions/{drug_name}")
# async def get_drug_interactions(drug_name: str):
#     """Get interactions for a specific drug"""
#     if not drug_interactions_df:
#         raise HTTPException(status_code=500, detail="Drug data not loaded")

#     drug_name = drug_name.lower()

#     interactions = drug_interactions_df[
#         (drug_interactions_df['drug1'] == drug_name) | (drug_interactions_df['drug2'] == drug_name)
#     ]

#     if interactions.empty:
#         return {"drug": drug_name, "interactions": []}

#     result = []
#     for _, row in interactions.iterrows():
#         result.append({
#             "drug1": row['drug1'],
#             "drug2": row['drug2'],
#             "severity": row['severity'],
#             "description": row['description'],
#             "recommendation": row['recommendation'],
#         })

#     return {"drug": drug_name, "interactions": result}


# if __name__ == "__main__":
#     import uvicorn
#     port = int(os.getenv("PORT", 8000))
#     uvicorn.run(app, host="0.0.0.0", port=port)


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