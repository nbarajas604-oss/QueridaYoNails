"""Actualiza assets/js/publicaciones.js con los reels más recientes de la página de Facebook.

Lo ejecuta GitHub Actions (.github/workflows/facebook.yml). Necesita el secreto
FB_PAGE_TOKEN: un token de acceso de la PÁGINA con permiso pages_read_engagement.

Uso local (opcional):  FB_PAGE_TOKEN=xxxx python .github/scripts/actualizar_publicaciones.py
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SALIDA = RAIZ / 'assets' / 'js' / 'publicaciones.js'
EXCLUIR = RAIZ / '.github' / 'facebook-excluir.txt'

GRAPH = os.environ.get('FB_GRAPH_URL', 'https://graph.facebook.com/v23.0')
CUANTOS = 3  # reels que se muestran en la página

ENCABEZADO = """// ══ REELS DE FACEBOOK EN "LO MÁS NUEVO" ═════════════════════════════
// Este archivo lo actualiza solo GitHub Actions (.github/workflows/facebook.yml).
// Si lo editas a mano, la próxima actualización automática lo reemplaza.
// Para ocultar un reel, agrega su número a .github/facebook-excluir.txt
// ═══════════════════════════════════════════════════════════════════
"""


def graph(ruta, token, **params):
    params['access_token'] = token
    url = f'{GRAPH}/{ruta}?{urllib.parse.urlencode(params)}'
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        detalle = e.read().decode('utf-8', 'replace')
        # No imprimimos la URL: lleva el token
        sys.exit(f'Error de Facebook ({e.code}): {detalle}')


def excluidos():
    if not EXCLUIR.exists():
        return set()
    return {m.group(0) for linea in EXCLUIR.read_text(encoding='utf-8').splitlines()
            if (m := re.search(r'\d+', linea.split('#')[0]))}


def actuales():
    if not SALIDA.exists():
        return []
    return re.findall(r"'(\d+)'", SALIDA.read_text(encoding='utf-8'))


def titulo(texto):
    """Primera línea de la descripción, corta y segura para un comentario de JS."""
    linea = (texto or '').strip().splitlines()[0] if (texto or '').strip() else 'Reel'
    linea = re.sub(r'[^\w\s¡!¿?.,áéíóúüñÁÉÍÓÚÜÑ-]', '', linea).strip()
    return (linea[:45] + '…') if len(linea) > 45 else (linea or 'Reel')


def main():
    token = os.environ.get('FB_PAGE_TOKEN', '').strip()
    if not token:
        print('Falta el secreto FB_PAGE_TOKEN; no se actualiza nada.')
        return

    bloqueados = excluidos()
    datos = graph('me/video_reels', token, fields='id,description,created_time', limit=20)

    elegidos = []
    for reel in datos.get('data', []):
        rid = reel['id']
        if rid in bloqueados:
            continue
        # Saltar los que Facebook no deja insertar fuera de su sitio
        if not graph(rid, token, fields='embeddable').get('embeddable', True):
            print(f'Se omite {rid}: Facebook no permite insertarlo.')
            continue
        elegidos.append((rid, titulo(reel.get('description'))))
        if len(elegidos) == CUANTOS:
            break

    if not elegidos:
        print('Facebook no devolvió reels que se puedan mostrar; se deja la lista como está.')
        return

    if [rid for rid, _ in elegidos] == actuales():
        print('Sin cambios: los reels ya están al día.')
        return

    ancho = max(len(rid) for rid, _ in elegidos) + 3
    lineas = []
    for i, (rid, nombre) in enumerate(elegidos):
        coma = ',' if i < len(elegidos) - 1 else ''
        lineas.append(f"  {(repr(rid) + coma).ljust(ancho)}  // {nombre}")
    SALIDA.write_text(ENCABEZADO + '\nconst PUBLICACIONES = [\n' + '\n'.join(lineas) + '\n];\n',
                      encoding='utf-8', newline='\n')
    print('Reels actualizados:', ', '.join(rid for rid, _ in elegidos))


if __name__ == '__main__':
    main()
