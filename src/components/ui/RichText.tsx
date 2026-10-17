import React from 'react';

/* Texto con negritas marcadas entre **dobles asteriscos**, como se escriben en
   `site.ts`. Ejemplo: 'Celebra con nosotros. **Tú pones la fecha.**' */
const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    )}
  </>
);

export default RichText;
