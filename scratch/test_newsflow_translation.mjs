import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function translateWithDeepL(text, isHTML = false) {
  try {
    console.log('Using Key:', process.env.DEEPL_API_KEY);
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        target_lang: 'EN',
        tag_handling: isHTML ? 'html' : '',
      }),
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    return data.translations[0].text;
  } catch (error) {
    console.error('Error in DeepL translation:', error);
    return null;
  }
}

translateWithDeepL('Hola mundo', false).then(res => console.log('Result:', res));
