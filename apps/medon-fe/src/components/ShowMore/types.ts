export interface ShowMoreTextHookReturnType {
  formatedText?: string;
  showMore?: boolean;
  isShowMorePossible?: boolean;
  handleShowToggle?: () => void;
}

export interface IShowMoreProps {
  text?: string;
}
