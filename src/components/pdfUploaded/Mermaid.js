import React from 'react';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import he from 'he';

const MermaidChatMessage = ({ diagramDefinition }) => {
  const decodedDiagramDefinition = he.decode(diagramDefinition);

  return (
    <div className="chat-message">
      <div className="chat-bubble">
        <Mermaid chart={decodedDiagramDefinition} />
      </div>
    </div>
  );
};

export default React.memo(MermaidChatMessage);
