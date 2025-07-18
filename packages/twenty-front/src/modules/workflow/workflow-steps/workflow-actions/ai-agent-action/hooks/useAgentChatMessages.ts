import { AgentChatMessageRole } from '@/workflow/workflow-steps/workflow-actions/ai-agent-action/constants/agent-chat-message-role';
import { useQuery } from '@apollo/client';
import { isDefined } from 'twenty-shared/utils';
import { File } from '~/generated-metadata/graphql';
import { GET_AGENT_CHAT_MESSAGES } from '../api/agent-chat-apollo.api';

export type AgentChatMessage = {
  id: string;
  threadId: string;
  role: AgentChatMessageRole;
  content: string;
  createdAt: string;
  files: File[];
};

export const useAgentChatMessages = (
  threadId: string,
  onCompleted?: (data: { messages: AgentChatMessage[] }) => void,
) => {
  return useQuery<{ messages: AgentChatMessage[] }>(GET_AGENT_CHAT_MESSAGES, {
    variables: { threadId },
    skip: !isDefined(threadId),
    onCompleted,
  });
};
