import sys
sys.path.insert(0, '.')
from dotenv import load_dotenv
load_dotenv()

from app.database import engine, Base
from sqlalchemy import text
from app import models

with engine.connect() as conn:
    print("Dropping tables...")
    conn.execute(text("DROP TABLE IF EXISTS services CASCADE"))
    conn.execute(text("DROP TABLE IF EXISTS universities CASCADE"))
    conn.commit()

print("Recreating tables...")
Base.metadata.create_all(bind=engine)
print("Done!")
