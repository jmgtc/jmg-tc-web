import { useState, useCallback } from 'react';
import { useDocumentOperation } from 'sanity';
import { TranslateIcon } from '@sanity/icons';

export const TranslateAction = (props: any) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isTranslating, setIsTranslating] = useState(false);

  const onHandle = useCallback(async () => {
    setIsTranslating(true);

    try {
      // Obtenemos los datos actuales del documento de las props
      const title = props.published?.title || props.draft?.title;
      // Simplificamos el cuerpo para la IA
      const body = props.published?.body?.[0]?.children?.[0]?.text || props.draft?.body?.[0]?.children?.[0]?.text || '';

      if (!title) {
        alert('Por favor, escribe un título primero.');
        setIsTranslating(false);
        return;
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: props.id,
          title,
          body
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`¡Listo! "${data.title}" se ha traducido correctamente.`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Error de conexión con el traductor.');
    } finally {
      setIsTranslating(false);
      props.onComplete();
    }
  }, [props]);

  return {
    disabled: isTranslating,
    label: isTranslating ? 'Traduciendo...' : 'Traducir a Inglés (IA)',
    icon: TranslateIcon,
    onHandle,
    shortcut: 'ctrl+alt+t',
  };
};
