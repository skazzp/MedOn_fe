import React, { useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

export interface IChatProps {
  onSubmitMessage: (message: string) => void;
}

export function Chat({ onSubmitMessage }: IChatProps) {
  useEffect(() => {
    addResponseMessage(
      '[12:30] **Dr. Smith:** Patient is allergic to ambrosia!'
    );
    addUserMessage('[12:31] **Dr. Alex:** no really!');
  }, []);

  return (
    <div className="App">
      <Widget handleNewUserMessage={onSubmitMessage} showTimeStamp={false} />
    </div>
  );
}
