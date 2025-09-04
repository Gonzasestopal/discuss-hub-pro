import { useState } from 'react';

import { ConversationDetail } from '@/components/ConversationDetail';
import { ConversationsList } from '@/components/ConversationsList';
import { Conversation } from '@/types/debate';

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  if (selectedConversation) {
    return <ConversationDetail conversation={selectedConversation} onBack={handleBackToList} />;
  }

  return <ConversationsList onSelectConversation={handleSelectConversation} />;
};

export default Index;
