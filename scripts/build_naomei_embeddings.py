"""Gera o índice semântico das âncoras NÃO-MEI (api/_naomei_index.js).

Diferente do build_cnae_embeddings.py (que reusa o .npz do bot, sem custo), aqui a
lista não-MEI é pequena (~35 âncoras) e não existe pré-embeddada — então EMBEDAMOS
de fato, com a MESMA infra do bot (app.services.embeddings → gemini-embedding-001,
768d, task RETRIEVAL_DOCUMENT, L2-normalizado). A chave sai do config do bot
(settings.gemini_api_key), nunca é exposta aqui nem vai pro bundle.

Fonte de verdade da lista: src/data/naomei.json (o mesmo JSON que o front lê pro
match lexical). Cada âncora vira o texto `"{label}. {keys...}"` (espelha o padrão do
índice de ocupações do bot: `"{ocupacao}. {termos}"`).

Uso (com a venv do bot, que tem google-genai + numpy + o config com a chave):
    /Users/.../zapmei/.venv/bin/python scripts/build_naomei_embeddings.py

Re-rode quando src/data/naomei.json mudar.
"""
import base64
import json
import os
import sys
from pathlib import Path

import numpy as np

SITE_ROOT = Path(__file__).resolve().parent.parent
BOT_ROOT = Path(os.environ.get("ZAPMEI_ROOT", SITE_ROOT.parent / "zapmei"))
sys.path.insert(0, str(BOT_ROOT))

from app.services import embeddings as embeddings_service  # noqa: E402

SRC = SITE_ROOT / "src" / "data" / "naomei.json"
OUT = SITE_ROOT / "api" / "_naomei_index.js"


def _anchor_text(e: dict) -> str:
    """Texto embeddado. Usa `anchor` explícito se houver; senão `label. keys`."""
    label = e.get("area") or e.get("categoria") or ""
    if e.get("anchor"):
        return e["anchor"].strip()
    keys = ", ".join(e.get("keys") or [])
    return f"{label}. {keys}".strip().rstrip(".") + "."


def main() -> int:
    data = json.loads(SRC.read_text(encoding="utf-8"))
    entries = []
    for e in data.get("regulamentadas", []):
        entries.append(("regulamentada", e.get("area", ""), e))
    for e in data.get("vedadas", []):
        entries.append(("vedada", e.get("categoria", ""), e))
    print(f"📚 {len(entries)} âncoras não-MEI em {SRC.name}")

    vecs, items = [], []
    for i, (tipo, label, e) in enumerate(entries, 1):
        v = embeddings_service.embed_document_sync(_anchor_text(e))
        vecs.append(v)
        items.append({
            "tipo": tipo,
            "label": label,
            "cnae": e.get("cnae", ""),
            "cnaeNome": e.get("cnaeNome", ""),
        })
        if i % 10 == 0 or i == len(entries):
            print(f"  embed {i}/{len(entries)}…", flush=True)

    mat = np.asarray(vecs, dtype=np.float32)
    norms = np.linalg.norm(mat, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    mat = (mat / norms).astype(np.float32)
    n, dim = mat.shape

    payload = {
        "model": "gemini-embedding-001",
        "dim": int(dim),
        "count": int(n),
        "items": items,
        "vectors_b64": base64.b64encode(mat.tobytes(order="C")).decode("ascii"),
    }
    banner = ("/* GERADO por scripts/build_naomei_embeddings.py — NÃO editar. Âncoras\n"
              "   NÃO-MEI (gemini-embedding-001 768d L2-normalizadas) pra api/cnae-busca.js.\n"
              "   Fonte: src/data/naomei.json. */\n")
    OUT.write_text(banner + "export default " + json.dumps(payload) + ";\n", encoding="utf-8")
    print(f"✅ {n}×{dim} → {OUT.relative_to(SITE_ROOT)}  ({OUT.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
