import { useState, useCallback } from 'react';
import { useDocumentOperation, useValidationStatus } from 'sanity';
import { SparklesIcon } from '@sanity/icons';

export const createAIAction = (originalPublishAction: any) => {
  const AIAction = (props: any) => {
    const { patch } = useDocumentOperation(props.id, props.type);
    const [isGenerating, setIsGenerating] = useState(false);

    const onHandle = useCallback(async () => {
      setIsGenerating(true);
      
      try {
        const title = props.draft?.title || props.published?.title;
        
        if (!title) {
          alert('Por favor, introduce un título primero para generar el contenido.');
          setIsGenerating(false);
          return;
        }

        // 1. Generar contenido en Español
        const genResponse = await fetch('/api/ai/generate-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });

        const genData = await genResponse.json();

        if (!genData.success) {
          throw new Error(genData.error || 'Error generando contenido');
        }

        // 2. Traducir automáticamente a Inglés
        const transResponse = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            body: genData.body,
            patchDocument: false
          }),
        });

        const transData = await transResponse.json();

        // 3. Aplicar todo al documento
        patch.execute([
          {
            set: {
              body: genData.body,
              title_en: transData.translatedTitle || title,
              body_en: transData.translatedBody || []
            }
          }
        ]);

        alert('✨ ¡Contenido generado y traducido con éxito!');

      } catch (err: any) {
        console.error("Error en AI Action:", err);
        alert(`Error: ${err.message}`);
      } finally {
        setIsGenerating(false);
      }
    }, [props, patch]);

    return {
      label: isGenerating ? 'Generando Magia...' : 'Generar con IA',
      icon: SparklesIcon,
      onHandle,
      disabled: isGenerating,
      shortcut: 'ctrl+g'
    };
  };

  return AIAction;
};
