"""Converte o índice semântico do bot (cnae_index.npz) no índice consumido pela
função serverless do site (api/_cnae_index.json).

Reusa EXATAMENTE os embeddings do bot (gemini-embedding-001, 768d, L2-normalizados)
— mesma base do produto, sem re-embeddar (zero custo de API pra indexar). A chave
Gemini só é usada em runtime, pra embeddar a query do usuário (ver api/cnae-busca.js).

Uso (com o venv do bot, que tem numpy):
    /Users/.../zapmei/.venv/bin/python scripts/build_cnae_embeddings.py \
        [caminho-do-cnae_index.npz]

Re-rode quando o bot regenerar o índice (nova lista do Anexo XI).
"""
import base64
import json
import sys
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
NPZ = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parent.parent / "zapmei" / "bot" / "data" / "cnae_index.npz"
# módulo .js (export default) — import estático garante que a Vercel empacote na função.
OUT = HERE.parent / "api" / "_cnae_index.js"


def _trib(t: str, cnae: str) -> str:
    if t == "ISS+ICMS":
        return "ISS/ICMS"
    if t in ("ISS", "ICMS"):
        return t
    return "ICMS" if cnae.startswith("56") else "ISS"


def main() -> int:
    z = np.load(NPZ, allow_pickle=False)
    vecs = np.asarray(z["vectors"], dtype=np.float32)   # (N, 768), já L2-normalizados
    codes = [str(x) for x in z["codes"]]
    ocs = [str(x) for x in z["ocupacoes"]]
    tribs = [str(x) for x in z["tributos"]]
    n, dim = vecs.shape
    assert len(codes) == len(ocs) == len(tribs) == n, "arrays paralelos desalinhados"

    # re-normaliza por segurança (dot de query normalizada = cosseno)
    norms = np.linalg.norm(vecs, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    vecs = (vecs / norms).astype(np.float32)

    items = [{"oc": ocs[i], "cnae": codes[i], "trib": _trib(tribs[i], codes[i])} for i in range(n)]
    payload = {
        "model": "gemini-embedding-001",
        "dim": int(dim),
        "count": int(n),
        "match_threshold": 0.66,
        "search_floor": 0.60,
        "items": items,
        # float32 contíguo (row-major) → base64. A função decodifica em Float32Array.
        "vectors_b64": base64.b64encode(vecs.tobytes(order="C")).decode("ascii"),
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    banner = "/* GERADO por scripts/build_cnae_embeddings.py — NÃO editar. Índice semântico\n   (embeddings do bot, gemini-embedding-001 768d L2-normalizados) pra api/cnae-busca.js. */\n"
    OUT.write_text(banner + "export default " + json.dumps(payload) + ";\n", encoding="utf-8")
    print(f"✅ {n}×{dim} → {OUT.relative_to(HERE.parent)}  ({OUT.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
