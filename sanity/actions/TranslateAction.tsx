import { useState, useCallback } from 'react';
import { useDocumentOperation } from 'sanity';

// Esto es un envoltorio que reemplaza la acción de "Publish" por defecto.
export const createPublishWithTranslationAction = (originalPublishAction: any) => {
  const WrappedAction = (props: any) => {
    // Obtenemos la acción de publicación original
    const originalResult = originalPublishAction(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    const [isTranslating, setIsTranslating] = useState(false);

    const onHandle = useCallback(async () => {
      // Si el botón está desactivado en la acción original (ej. no hay cambios), no hacemos nada
      if (originalResult.disabled) {
        originalResult.onHandle();
        return;
      }

      setIsTranslating(true);

      try {
        const draft = props.draft;
        if (!draft) {
          // Si no hay borrador, llamamos al publish original
          originalResult.onHandle();
          return;
        }

        const title = draft.title || '';
        
        // Helper seguro para extraer texto plano ignorando imágenes u otros bloques especiales
        const extractTextFromBlocks = (blocks: any[]) => {
          if (!Array.isArray(blocks)) return '';
          return blocks
            .map(block => {
              if (block._type !== 'block' || !block.children) return '';
              return block.children.map((child: any) => child.text || '').join('');
            })
            .join('\\n')
            .trim();
        };

        const bodyText = extractTextFromBlocks(draft.body);
        const bodyEnText = extractTextFromBlocks(draft.body_en);
        const titleEnText = draft.title_en?.trim() || '';

        // Necesita traducción si:
        // 1. No tiene título en inglés, O
        // 2. No tiene cuerpo en inglés (si hay un cuerpo en español), O
        // 3. El título en inglés es idéntico al español (= nunca se tradujo de verdad)
        const needsTranslation =
          title &&
          (!titleEnText || (bodyText && !bodyEnText) || titleEnText === title.trim());

        if (needsTranslation) {
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              documentId: props.id,
              title,
              body: draft.body || [], // Pasamos el array original para preservar el formato
              patchDocument: false
            }),
          });

          const data = await response.json();

          if (data.success) {
            // Aplicamos el parche localmente para que el documento publicado tenga los cambios
            patch.execute([
              {
                set: {
                  title_en: data.translatedTitle,
                  body_en: data.translatedBody // Esto ahora es el array completo con el formato preservado
                }
              }
            ]);
            
            // Esperamos un segundo para que Sanity registre el parche antes de publicar
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } else {
            console.error("Error en la traducción automática:", data.error);
            alert(`Hubo un error traduciendo automáticamente al inglés: ${data.error}`);
          }
        }
      } catch (err) {
        console.error("Error conectando con el traductor:", err);
      } finally {
        setIsTranslating(false);
        // Finalmente, llamamos a la acción de publicación original para que se publique
        originalResult.onHandle();
      }
    }, [props, originalResult, patch]);

    return {
      ...originalResult,
      label: isTranslating ? 'Traduciendo y Publicando...' : originalResult.label,
      disabled: originalResult.disabled || isTranslating,
      onHandle,
    };
  };

  return WrappedAction;
};
