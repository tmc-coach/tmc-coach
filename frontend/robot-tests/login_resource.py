import os
from pathlib import Path
from dotenv import load_dotenv


load_dotenv()
dirname = Path(__file__).parent.parent.parent
try:
	load_dotenv(dotenv_path=os.path.join(dirname, "backend", ".env"))
except FileNotFoundError:
	pass

tmcusername = os.getenv("TMCUSERNAME")
tmcpassword = os.getenv("TMCPASSWORD")
