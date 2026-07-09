"""Calibra os thresholds da detecção semântica NÃO-MEI — offline, com a venv do bot.

Carrega os dois índices já gerados (api/_cnae_index.js = 466 permitidas;
api/_naomei_index.js = âncoras não-MEI), embeda cada query de teste (RETRIEVAL_QUERY,
igual o runtime), e imprime o melhor score permitido vs. o melhor score não-MEI —
pra escolher NAOMEI_MATCH e MARGIN sem precisar deployar.

Uso:
    /Users/.../zapmei/.venv/bin/python scripts/calibrate_naomei.py
"""
import json
import os
import sys
from pathlib import Path

import numpy as np

SITE_ROOT = Path(__file__).resolve().parent.parent
BOT_ROOT = Path(os.environ.get("ZAPMEI_ROOT", SITE_ROOT.parent / "zapmei"))
sys.path.insert(0, str(BOT_ROOT))

from app.services import embeddings as embeddings_service  # noqa: E402

# queries de teste: (texto, esperado)  esperado ∈ {"mei", "nao"}
TESTS = [
    ("médico", "nao"), ("sou médico", "nao"), ("dentista", "nao"),
    ("advogado", "nao"), ("programador", "nao"), ("desenvolvo aplicativos", "nao"),
    ("sou dev", "nao"), ("crio sites", "nao"), ("personal trainer", "nao"),
    ("sou personal", "nao"), ("professor de academia", "nao"),
    ("farmacêutico", "nao"), ("psicólogo", "nao"), ("nutricionista", "nao"),
    ("engenheiro civil", "nao"), ("veterinário", "nao"), ("importo eletrônicos", "nao"),
    ("comércio atacadista", "nao"), ("representante comercial", "nao"),
    # PERMITIDAS — não podem virar "não-MEI" (falso-bloqueio):
    ("manicure", "mei"), ("cabeleireiro", "mei"), ("pedreiro", "mei"),
    ("faço bolo", "mei"), ("conserto de computadores", "mei"),
    ("comerciante de artigos médicos", "mei"), ("eletricista", "mei"),
    ("costureira", "mei"), ("fotógrafo", "mei"), ("motoboy", "mei"),
    ("professor particular", "mei"), ("diarista", "mei"), ("vendo roupas", "mei"),
    ("técnico em informática", "mei"), ("aulas de música", "mei"),
]


def _load_index(path: Path):
    txt = path.read_text(encoding="utf-8")
    i = txt.index("export default ") + len("export default ")
    payload = json.loads(txt[i:].rstrip().rstrip(";"))
    buf = np.frombuffer(base64_bytes(payload["vectors_b64"]), dtype=np.float32)
    mat = buf.reshape(payload["count"], payload["dim"])
    return payload, mat


def base64_bytes(s: str) -> bytes:
    import base64
    return base64.b64decode(s)


def main() -> int:
    mei, mei_m = _load_index(SITE_ROOT / "api" / "_cnae_index.js")
    nao, nao_m = _load_index(SITE_ROOT / "api" / "_naomei_index.js")
    print(f"permitidas: {mei['count']}×{mei['dim']} · âncoras não-MEI: {nao['count']}×{nao['dim']}\n")
    print(f"{'query':<34}{'esp':<5}{'bestMEI':<9}{'bestNAO':<9}{'label não-MEI':<28}margem")
    print("-" * 100)
    for q, exp in TESTS:
        raw = np.asarray(embeddings_service.embed_query_sync(q), dtype=np.float32)
        raw /= (np.linalg.norm(raw) or 1.0)
        s_mei = float((mei_m @ raw).max())
        nao_scores = nao_m @ raw
        j = int(nao_scores.argmax())
        s_nao = float(nao_scores[j])
        label = nao["items"][j]["label"]
        margin = s_nao - s_mei
        flag = "  <<" if (exp == "nao") == (margin > 0) else "  ??"
        print(f"{q:<34}{exp:<5}{s_mei:<9.3f}{s_nao:<9.3f}{label:<28}{margin:+.3f}{flag}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
