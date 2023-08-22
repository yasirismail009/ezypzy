import React, { useRef, useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ diagramDefinition, handleOpenModal }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (diagramDefinition) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: {
          // useMaxWidth: false,
          // htmlLabels: true,
        },
      });

      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = diagramDefinition;
        mermaid.init(undefined, mermaidRef.current);
      }

      return () => {
        if (mermaidRef.current) {
          mermaid.unbind(mermaidRef.current);
        }
      };
    }
  }, [diagramDefinition]);

  return (
    <div
      ref={mermaidRef}
      onClick={(e) => {
        handleOpenModal(diagramDefinition);
      }}
      className="mermaid"
    />
  );
};

export default MermaidDiagram;
