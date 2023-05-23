import { ChatMessage } from 'components/Chat/types';

export function dataToChatMessage(message: ChatMessage): string {
  const { createdAt, sender, value } = message;

  const hours = new Date(createdAt).getHours();
  const minutes = new Date(createdAt).getMinutes();
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return `**${formattedTime} Dr. ${sender.lastName}:** ${value}`;
}
