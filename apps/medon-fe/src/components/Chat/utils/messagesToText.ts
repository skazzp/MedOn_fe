import { ChatMessage } from 'components/Chat/types';

export function messagesToText(messages: ChatMessage[]): string {
  return messages.reduce(
    (acc, message) =>
      acc +
      `[${new Date(message.createdAt).toLocaleTimeString()}] ${
        message.sender.lastName
      }: ${message.value}\n`,
    ''
  );
}
