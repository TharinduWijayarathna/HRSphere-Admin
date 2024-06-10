declare module 'react-signature-canvas' {
    import * as React from 'react';
  
    export interface ReactSignatureCanvasProps {
      canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
      clearOnResize?: boolean;
      velocityFilterWeight?: number;
      minWidth?: number;
      maxWidth?: number;
      dotSize?: number | (() => number);
      penColor?: string;
      backgroundColor?: string;
      onEnd?: () => void;
      onBegin?: () => void;
    }
  
    export default class SignatureCanvas extends React.Component<ReactSignatureCanvasProps> {
      clear(): void;
      fromDataURL(dataURL: string, options?: object, callback?: () => void): void;
      toDataURL(type?: string, encoderOptions?: number): string;
      on(): void;
      off(): void;
      isEmpty(): boolean;
      getCanvas(): HTMLCanvasElement;
      getTrimmedCanvas(): HTMLCanvasElement;
    }
  }
  