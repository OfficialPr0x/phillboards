import React from 'react';
import { ViewStyle } from 'react-native';

declare module './Modal' {
  export interface ModalProps {
    children: React.ReactNode;
    visible: boolean;
    onClose?: () => void;
    title?: string;
    variant?: 'default' | 'bottom' | 'center' | 'fullscreen';
    closeOnBackdropPress?: boolean;
    showCloseButton?: boolean;
    footer?: React.ReactNode;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
    backdropStyle?: ViewStyle;
  }

  const Modal: React.FC<ModalProps>;
  export default Modal;
} 