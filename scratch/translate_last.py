import json
import urllib.request
import urllib.parse
import time

# Config
SANITY_PROJECT_ID = 'mfth4gqi'
SANITY_TOKEN = 'skBlJNtcZMeJc15ksKU4vxdYvXFFi55m1LI1r3zoqx2Bnh6OVsi8bxQZMf7RMAh7e0Dwy8PCckuB9cZoHh9Y5B19K1Eged7WxjTHeQpv3Qn18h1JuVHav8oMN7txmT1liugK4cjHL5OQmg1VHmOQ8BDbhHKEa0xyjYxWEknfcjoi9zarLXgk'
DEEPL_KEY = '943be21e-8058-4405-9252-5770fb9548c9:fx'

def translate(text):
    if not text: return ""
    url = "https://api-free.deepl.com/v2/translate"
    data = urllib.parse.urlencode({
        'text': text,
        'target_lang': 'EN'
    }).encode('utf-8')
    req = urllib.request.Request(url, data=data)
    req.add_header('Authorization', f'DeepL-Auth-Key {DEEPL_KEY}')
    with urllib.request.urlopen(req) as f:
        res = json.loads(f.read().decode('utf-8'))
        return res['translations'][0]['text']

def sanity_query(query):
    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/production?query={urllib.parse.quote(query)}"
    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Bearer {SANITY_TOKEN}')
    with urllib.request.urlopen(req) as f:
        return json.loads(f.read().decode('utf-8'))['result']

def sanity_mutate(mutations):
    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/production"
    data = json.dumps({'mutations': mutations}).encode('utf-8')
    req = urllib.request.Request(url, data=data)
    req.add_header('Authorization', f'Bearer {SANITY_TOKEN}')
    req.add_header('Content-Type', 'application/json')
    with urllib.request.urlopen(req) as f:
        return json.loads(f.read().decode('utf-8'))

# Main
try:
    print("Buscando último post...")
    post = sanity_query('*[_type == "post"] | order(publishedAt desc) [0]{_id, title, excerpt, body}')
    if not post:
        print("No se encontró el post.")
    else:
        print(f"Traduciendo: {post['title']}")
        title_en = translate(post['title'])
        
        # Procesar body (intentar mantener estructura de bloques)
        body_en = []
        for block in post.get('body', []):
            if block.get('_type') == 'block':
                new_block = block.copy()
                for child in new_block.get('children', []):
                    if child.get('text'):
                        child['text'] = translate(child['text'])
                body_en.append(new_block)
            else:
                body_en.append(block)

        print("Actualizando Sanity...")
        mutation = [{
            "patch": {
                "id": post['_id'],
                "set": {
                    "title_en": title_en,
                    "body_en": body_en
                }
            }
        }]
        sanity_mutate(mutation)
        print("¡Éxito! Post traducido y subido.")

except Exception as e:
    print(f"Error: {e}")
