import React, { useRef, useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ diagramDefinition }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    // Delay Mermaid initialization until the component is mounted
    console.log("diagramDefinition",diagramDefinition)
    if(diagramDefinition){
     mermaid.initialize({ startOnLoad: false }); // Initialize Mermaid but don't start rendering
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = diagramDefinition;
      mermaid.init(undefined, mermaidRef.current); // Start rendering the diagram inside the div
    }
    return () => {
      if (mermaidRef.current) {
        mermaid.unbind(mermaidRef.current); // Clean up Mermaid when the component unmounts
      }
    };
   }
   

   
  }, [diagramDefinition]);

  return <div ref={mermaidRef} className="mermaid" />;
};

export default MermaidDiagram;
